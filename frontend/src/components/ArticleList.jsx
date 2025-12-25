import React, { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        // Fallback to mock data if API fails
        setArticles([
          {
            id: 1,
            title: "AI in Healthcare: Hype or Reality?",
            content: "Doctors and hospitals are slowly adopting AI in healthcare...",
            source_url: "https://beyondchats.com/blogs/ai-in-healthcare-hype-or-reality/"
          },
          {
            id: 2,
            title: "What If AI Recommends the Wrong Medicine?",
            content: "AI is changing the world fast...",
            source_url: "https://beyondchats.com/blogs/what-if-ai-recommends-the-wrong-medicine-whos-to-blame-2/"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
