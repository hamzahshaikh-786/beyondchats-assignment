const { google } = require('googleapis');
require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

async function searchGoogleForBlogs(title) {
    try {
        const customsearch = google.customsearch('v1');
        const response = await customsearch.cse.list({
            auth: GOOGLE_API_KEY,
            cx: GOOGLE_SEARCH_ENGINE_ID,
            q: title,
            num: 10, // Get more to filter
        });

        const items = response.data.items || [];
        // Filter for blogs or articles (exclude videos, images, etc.)
        const blogLinks = items
            .filter(item => item.link && (item.link.includes('/blog/') || item.link.includes('/article/') || item.displayLink.includes('blog')))
            .slice(0, 2) // Top 2
            .map(item => item.link);

        return blogLinks;
    } catch (error) {
        throw error;
    }
}

module.exports = { searchGoogleForBlogs };