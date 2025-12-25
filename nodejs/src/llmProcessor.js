const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function reformatArticle(originalTitle, originalContent, scrapedContents) {
    try {
        const references = scrapedContents.map((item, index) => `[${index + 1}] ${item.url}`).join('\n');

        const prompt = `
Reformat the following article to match the style, formatting, and content structure of the top-ranking blog articles provided. Make it more engaging, professional, and similar in tone.

Original Article Title: ${originalTitle}
Original Content: ${originalContent}

Reference Articles (for style inspiration):
${scrapedContents.map(item => `URL: ${item.url}\nContent: ${item.content}`).join('\n\n')}

Output the reformatted article, and at the bottom, cite the references like:
References:
${references}
`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 2000,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error with LLM:', error.message);
        throw error;
    }
}

module.exports = { reformatArticle };