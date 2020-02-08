// React
import React from 'react';

// CSS
import './App.scss';

import EmojiTranslator from './components/emojiTranslator';

const App = () => {
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
      <EmojiTranslator></EmojiTranslator>
    </div>
  );
};

export default App;
