import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ articles, setArticles ] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchArticles = async () => {
      const articlesResponse = await fetch(`https://www.pinkvilla.com/photo-gallery-feed-page/page/${page}`)
      const newArticles = await articlesResponse.json();

      setIsLoading(false);
      setArticles(previous => [
        ...previous,
        // Flattening a bit for convenience
        ...newArticles.nodes.map(article => article.node)
      ]);
    }
    fetchArticles();
  }, [page])

  return (
    <div className="App">
      <header className="App-header">
        <img src="/orkes-logo-purple.png" height="100" className="App-logo" alt="logo" />
        <p>
          UI Question
        </p>
      </header>
      <div className='articleList'>
        {
          articles.map((article, i) => {
            return (
              <div className='articleCard' key={i}>
                <div className='articlePicture'>
                  <img alt="Placeholder pic." src={ `https://www.pinkvilla.com/${article.field_photo_image_section}` } />
                </div>
                <div className='articleContent'>
                  <h1>{ article.title }</h1>
                  <p className='articleDate'>Dec 02, 2021 03:51 AM IST</p>
                </div>
              </div>
            )
          })
        }
        {
          isLoading && <div className='loader'>Loading...</div>
        }
      </div>
    </div>
  );
}

export default App;
