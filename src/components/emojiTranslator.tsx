// React
import React, { useState, useEffect } from 'react';

// React Bootstrap
import { Container, Row, Col, Input, Button } from 'reactstrap';

// CSS
import './emojiTranslator.scss';

// Constants
import { translate } from '../constants/general';

// Emoji Library
const emojilib = require('emojilib');

const EmojiTranslator = () => {
  const [inputText, setInputText] = useState();
  const [outputText, setOutputText] = useState('');

  useEffect(() => {}, [outputText]);

  const allEmojis: Object = emojilib.lib;
  const allEmojisValues: any = Object.values(allEmojis);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const translateToEmoji = () => {
    const inputWords = inputText.split(' ');

    inputWords.forEach((word: string) => {
      return allEmojisValues.forEach((emojiArray: any) => {
        const keywords = emojiArray.keywords.join(' ');
        if (keywords.includes(word)) {
          setOutputText(outputText + emojiArray.char);
        }
      });
    });
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Input
            className="text-input"
            placeholder="Text to Translate to Emoji's"
            type="textarea"
            name="text"
            id="translateText"
            onChange={event => {
              handleChange(event);
            }}
          />
        </Col>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Button
            color="primary"
            onClick={event => {
              translateToEmoji();
            }}
          >
            {translate}
          </Button>
        </Col>

        <Col sm="12" md={{ size: 6, offset: 3 }}>
          {outputText}
        </Col>
      </Row>
    </Container>
  );
};

EmojiTranslator.propTypes = {};

export default EmojiTranslator;
