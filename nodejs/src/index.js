const { getLatestArticle } = require('./services/articleFetcher');
const { searchGoogleForBlogs } = require('./services/googleScraper');
const { scrapeContentFromUrls } = require('./services/webScraper');
const { reformatArticle } = require('./services/llmProcessor');
const axios = require('axios');
require('dotenv').config();

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://localhost:8000/api';

async function processArticle() {
    try {
        const article = await getLatestArticle();

        const blogUrls = await searchGoogleForBlogs(article.title);

        const scrapedContents = await scrapeContentFromUrls(blogUrls);

        const reformattedContent = await reformatArticle(article.title, article.content, scrapedContents);

        await axios.put(`${LARAVEL_API_URL}/articles/${article.id}`, {
            title: article.title,
            content: reformattedContent,
            source_url: article.source_url,
        });

    } catch (error) {
        // Handle error silently or log to file
    }
}

processArticle();