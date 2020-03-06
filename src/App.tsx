// React
import React from 'react';

// CSS
import './App.scss';

// Constants
import { headerText } from './constants/general';

import EmojiTranslator from './components/emojiTranslator';

const App = () => {
  return (
    <div className="App">
      <header className="header-text">
        <p>
          <span role="img" aria-label="on-fire">
            🔥🔥🔥
          </span>
          {headerText}
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
