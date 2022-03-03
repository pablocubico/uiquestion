import './App.css';
import { useEffect, useState, useRef } from 'react';

const searchParams = new URLSearchParams(window.location.search);
const startPage = parseInt(searchParams.get('page')) || 0;

function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ page, setPage ] = useState(startPage);
  const [ articles, setArticles ] = useState([]);
  const [ allArticlesLoaded, setAllArticlesLoaded ] = useState(false);
  const scrollObserver = useRef(null);
  const loaderElement = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchArticles = async () => {
      const articlesResponse = await fetch(`https://www.pinkvilla.com/photo-gallery-feed-page/page/${page}`)
      const newArticles = await articlesResponse.json();

      setIsLoading(false);
      if (newArticles.nodes.length) {
        setArticles(previous => [
          ...previous,
          // Flattening a bit for convenience
          ...newArticles.nodes.map(article => article.node)
        ]);
      } else {
        setAllArticlesLoaded(true);
      }
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

  useEffect(() => {
    if (allArticlesLoaded) {
      scrollObserver.current.unobserve(loaderElement.current);
    }
  }, [allArticlesLoaded]);

  const loadingText = isLoading ? 'Loading...' : 'Show more results';

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
                  <img alt={ article.title } src={ `https://www.pinkvilla.com/${article.field_photo_image_section}` } />
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
              allArticlesLoaded
              ? 'All articles loaded.'
              : loadingText
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App;
