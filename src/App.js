import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/orkes-logo-purple.png" height="100" className="App-logo" alt="logo" />
        <p>
          UI Question
        </p>
      </header>
      <div className='articleList'>
        <div className='articleCard'>
          <div className='articlePicture'>
            <img alt="Placeholder pic." src="https://picsum.photos/250/250" />
          </div>
          <div className='articleContent'>
            <h1>Title lorem ipsum.</h1>
            <p className='articleDate'>Dec 02, 2021 03:51 AM IST</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
