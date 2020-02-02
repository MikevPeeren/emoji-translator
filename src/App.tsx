// React
import React from 'react';

// CSS
import './App.css';

// Testing will be moved to different component
const emojilib = require('emojilib');

const App = () => {
  // Testing will be moved to different component
  const allEmojis = emojilib.lib;

  console.log(allEmojis);
  return (
    <div className="App">
      <header className="header-text">
        <p>
          <span role="img" aria-label="on-fire">
            🔥🔥🔥
          </span>{' '}
          Translate text to Emoji's !!{' '}
          <span role="img" aria-label="on-fire">
            🔥🔥🔥
          </span>
        </p>
      </header>
    </div>
  );
};

export default App;
