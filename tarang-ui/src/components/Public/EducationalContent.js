
import React from 'react';

const EducationalContent = () => {
  const articles = [
    { title: 'Understanding Tides and Currents', link: '#' },
    { title: 'Safety Measures During High Surf', link: '#' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Educational Content</h2>
      <ul className="space-y-2">
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.link} className="text-blue-500 hover:underline">{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationalContent;
