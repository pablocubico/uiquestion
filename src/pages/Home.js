import '../styles/Home.css';
import Articles from '../components/Articles';
import { ErrorBoundary } from '../components/ErrorBoundary';

const searchParams = new URLSearchParams(window.location.search);
const startPage = parseInt(searchParams.get('page')) || 0;
const forceError = !!searchParams.get('forceError');

function ArticlesPage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/orkes-logo-purple.png" height="100" className="App-logo" alt="logo" />
        <p>
          UI Question
        </p>
      </header>
      <div className="container">
        <ErrorBoundary>
          <Articles startPage={startPage} forceError={forceError} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default ArticlesPage;
