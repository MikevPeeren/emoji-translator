// React
import React, { useState, useEffect } from 'react';

// React Bootstrap
import { Container, Row, Col, Input, Button } from 'reactstrap';

// CSS
import './emojiTranslator.scss';

// Constants
import { translate, clear, warning } from '../constants/general';

// Emoji Library
const allEmojis = require('emojilib').lib;

const EmojiTranslator = () => {
  const [inputText, setInputText] = useState();
  const [outputText, setOutputText] = useState('');
  const [warningText, setWarningText] = useState('');

  useEffect(() => {}, [outputText]);

  useEffect(() => {
    const inputTextbox = document.getElementById(
      'translateText',
    ) as HTMLInputElement;
    if (inputTextbox) inputTextbox.value = warningText;
  }, [warningText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const translateToEmoji = () => {
    let emojisFound: any[] = [];
    let output = '';
    if (!inputText) {
      setWarningText(warning);
      return;
    }
    const inputWords = inputText.split(' ');

    inputWords.forEach((word: string) => {
      emojisFound = [];
      getEmojisForWord(emojisFound, word);

      if (emojisFound.length > 0) {
        console.log(emojisFound);
        output =
          output +
          ' ' +
          emojisFound[Math.floor(Math.random() * emojisFound.length)];
      } else {
        output = output + word;
      }
    });

    setOutputText(output);
  };

  const getEmojisForWord = (emojisFound: any[], originalWord: string) => {
    let word = originalWord.toLowerCase();

    if (!word || word === '' || word === 'a' || word === 'it' || word === 'is')
      return '';

    for (let emoji in allEmojis) {
      let keywords = allEmojis[emoji].keywords;
      if (keywords && keywords.indexOf(word) >= 0) {
        emojisFound.push(allEmojis[emoji].char);
      }
    }
  };

  const clearTextBoxes = () => {
    const inputTextbox = document.getElementById(
      'translateText',
    ) as HTMLInputElement;
    if (inputTextbox) inputTextbox.value = '';
    setInputText('');
    setOutputText('');
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
      </Row>
      <Row>
        <Col className="buttons" sm="12" md={{ size: 6, offset: 3 }}>
          <Button
            color="primary"
            className="buttons__translate"
            onClick={event => {
              translateToEmoji();
            }}
          >
            {translate}
          </Button>
          <Button
            color="primary"
            className="buttons__clear"
            onClick={event => {
              clearTextBoxes();
            }}
          >
            {clear}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="output-text" sm="12" md={{ size: 6, offset: 3 }}>
          {outputText}
        </Col>
      </Row>
    </Container>
  );
};

EmojiTranslator.propTypes = {};

export default EmojiTranslator;
