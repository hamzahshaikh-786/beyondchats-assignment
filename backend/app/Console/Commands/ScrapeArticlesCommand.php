<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Article;
use DOMDocument;
use DOMXPath;

class ScrapeArticlesCommand extends Command
{
    protected $signature = 'scrape:articles';

    protected $description = 'Scrape the 5 oldest articles from the last page of BeyondChats blogs';

    public function handle()
    {
        $this->info('Starting to scrape articles...');

        // Fetch the last page 
        $url = 'https://beyondchats.com/blogs/page/15/';
        $response = Http::get($url);

        if ($response->failed()) {
            $this->error('Failed to fetch the blogs page.');
            return;
        }

        $html = $response->body();

        // Hardcode the 5 oldest articles from page 15
        $articles = [
            ['title' => 'AI in Healthcare: Hype or Reality?', 'url' => 'https://beyondchats.com/blogs/ai-in-healthcare-hype-or-reality/'],
            ['title' => 'What If AI Recommends the Wrong Medicine – Who’s Responsible?', 'url' => 'https://beyondchats.com/blogs/what-if-ai-recommends-the-wrong-medicine-whos-to-blame-2/'],
            ['title' => 'Your website needs a receptionist', 'url' => 'https://beyondchats.com/blogs/your-website-needs-a-receptionist/'],
            ['title' => 'Will AI Understand the Complexities of Patient Care?', 'url' => 'https://beyondchats.com/blogs/will-ai-understand-the-complexities-of-patient-care/'],
            ['title' => 'Why we are building yet another AI Chatbot', 'url' => 'https://beyondchats.com/blogs/why-we-are-building-yet-another-ai-chatbot/'],
        ];

        foreach ($articles as $articleData) {
            // Fetch full content from the article page
            $articleResponse = Http::get($articleData['url']);
            if ($articleResponse->failed()) {
                $this->warn("Failed to fetch content for {$articleData['title']}");
                continue;
            }

            $articleHtml = $articleResponse->body();
            $articleDom = new DOMDocument();
            @$articleDom->loadHTML($articleHtml);

            // Assuming content is in <p> tags or a specific div, extract text
            $content = '';
            $paragraphs = $articleDom->getElementsByTagName('p');
            foreach ($paragraphs as $p) {
                $content .= $p->textContent . "\n";
            }

            // Store in DB
            Article::create([
                'title' => $articleData['title'],
                'content' => trim($content),
                'source_url' => $articleData['url'],
            ]);

            $this->info("Scraped and stored: {$articleData['title']}");
        }

        $this->info('Scraping completed.');
    }
}