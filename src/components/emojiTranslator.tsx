// React
import React, { useState, useEffect } from 'react';

// React Bootstrap
import { Container, Row, Col, Input, Button } from 'reactstrap';

// CSS
import './emojiTranslator.scss';

// Constants
import { translate, clear, warning } from '../constants/general';

// Emoji Library
const emojilib = require('emojilib');

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

  const allEmojis: Object = emojilib.lib;
  const allEmojisValues: any = Object.values(allEmojis);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const translateToEmoji = () => {
    if (!inputText) {
      setWarningText(warning);
      return;
    }
    const inputWords = inputText.split(' ');

    inputWords.forEach(async (word: string) => {
      if (!word || word === '') return;
      word.toLowerCase();
      const emojiFound = await allEmojisValues.some((emojiArray: any) => {
        const keywords = emojiArray.keywords.join(' ');
        return emojiArray.keywords.some((keyword: string) => {
          if (keywords.indexOf(word) === 0) {
            console.log(outputText);
            const newOutputText = outputText.concat(' ', emojiArray.char);
            setOutputText(newOutputText);
            return true;
          }
          return false;
        });
      });

      console.log(emojiFound);
      if (!emojiFound) setOutputText(outputText.concat(' ', word));
    });
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
