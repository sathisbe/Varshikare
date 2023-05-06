import { useState, useEffect } from 'react';
import { request } from 'graphql-request';

const NEWS_QUERY = `
  query NewsQuery {
    news {
      id
      title
      content
      imageUrl
    }
  }
`;

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    request('/api/graphql', NEWS_QUERY)
      .then(data => {
        setNews(data.news);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Latest News</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {news.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <img src={item.imageUrl} alt={`Thumbnail for ${item.title}`} style={{ marginRight: '1rem', width: '100px', height: '100px' }} />
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h2>
              <p style={{ fontSize: '1rem' }}>{item.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
