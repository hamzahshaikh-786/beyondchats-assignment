import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div className="card">
      <h2>{article.title}</h2>
      <p>
        <strong>Source:</strong>{" "}
        <a href={article.source_url} target="_blank" rel="noopener noreferrer">
          {article.source_url}
        </a>
      </p>
      <div>
        <h3>Content:</h3>
        <p>{article.content.substring(0, 300)}...</p>{" "}
        {/* Truncate for preview */}
      </div>
    </div>
  );
};

export default ArticleCard;
