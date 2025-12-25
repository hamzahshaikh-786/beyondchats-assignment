const puppeteer = require('puppeteer');

async function scrapeContentFromUrls(urls) {
    const browser = await puppeteer.launch({ headless: true });
    const contents = [];

    for (const url of urls) {
        try {
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });

            // Extract main content (assuming it's in article, main, or p tags)
            const content = await page.evaluate(() => {
                const article = document.querySelector('article') || document.querySelector('main') || document.body;
                return article ? article.innerText : '';
            });

            contents.push({ url, content: content.substring(0, 5000) }); // Limit content
            await page.close();
        } catch (error) {
            contents.push({ url, content: '' });
        }
    }

    await browser.close();
    return contents;
}

module.exports = { scrapeContentFromUrls };