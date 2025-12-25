const axios = require('axios');
require('dotenv').config();

const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://localhost:8000/api';

async function getLatestArticle() {
    try {
        const response = await axios.get(`${LARAVEL_API_URL}/articles`);
        const articles = response.data;
        if (articles.length === 0) {
            throw new Error('No articles found');
        }
        // Assuming the last one is the latest
        return articles[articles.length - 1];
    } catch (error) {
        console.error('Error fetching latest article:', error.message);
        throw error;
    }
}

module.exports = { getLatestArticle };