import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ page, setPage ] = useState(0);
  const [ articles, setArticles ] = useState([]);
  const scrollObserver = useRef(null);
  const loaderElement = useRef(null);

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

  useEffect(() => {
    const element = loaderElement.current;
    scrollObserver.current = new IntersectionObserver(entries => {
      // Skip if there are no articles yet (i.e.: the first load)
      if (entries[0].isIntersecting && articles.length) {
        setPage(current => current + 1);
      }
    }, { threshold: 1 });
    scrollObserver.current.observe(element);

    return () => {
      scrollObserver.current.unobserve(element);
    }
  }, [articles]);

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
              <a key={i}
                className='articleCard'
                target="_blank"
                href={ `https://www.pinkvilla.com/${article.path}` }
                rel="noreferrer">
                <div className='articlePicture'>
                  <img alt="Placeholder pic." src={ `https://www.pinkvilla.com/${article.field_photo_image_section}` } />
                </div>
                <div className='articleContent'>
                  <h1>{ article.title }</h1>
                  <p className='articleDate'>Dec 02, 2021 03:51 AM IST</p>
                </div>
              </a>
            )
          })
        }
        {
          <div className='loader' ref={loaderElement}>
            {
              isLoading
              ? 'Loading...'
              : 'Show more results'
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App;
