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
        output =
          output +
          ' ' +
          emojisFound[Math.floor(Math.random() * emojisFound.length)];
      } else {
        output = output + ' ' + word;
      }
    });

    setOutputText(output);
  };

  const getEmojisForWord = (emojisFound: any[], originalWord: string) => {
    let word = originalWord.toLowerCase();

    if (!word || word === '' || word === 'a' || word === 'it' || word === 'is')
      return '';

    let isSingular = '';
    if (word.length > 2 && word[word.length - 1] === 's') {
      isSingular = word.slice(0, word.length - 1);
    }

    let isPlural = word.length === 1 ? '' : word + 's';

    let isVerbedSimple = '';
    let isVerbedVowel = '';
    let isVerbedDoubled = '';

    if (word.indexOf('ing') !== -1) {
      let verb = word.substr(0, word.length - 3);
      isVerbedSimple = verb;
      isVerbedVowel = verb + 'e';
      isVerbedDoubled = verb.substr(0, verb.length - 1);
    }

    for (let emoji in allEmojis) {
      let keywords = allEmojis[emoji].keywords;
      if (
        word === allEmojis[emoji].char ||
        emoji === word ||
        emoji === word + '_face' ||
        emoji === isSingular ||
        emoji === isPlural ||
        emoji === isVerbedSimple ||
        emoji === isVerbedVowel ||
        emoji === isVerbedDoubled ||
        (keywords && keywords.indexOf(word) >= 0) ||
        (keywords && keywords.indexOf(isSingular) >= 0) ||
        (keywords && keywords.indexOf(isPlural) >= 0) ||
        (keywords && keywords.indexOf(isVerbedSimple) >= 0) ||
        (keywords && keywords.indexOf(isVerbedVowel) >= 0) ||
        (keywords && keywords.indexOf(isVerbedDoubled) >= 0)
      ) {
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
        <Col className="text-output" sm="12" md={{ size: 6, offset: 3 }}>
          {outputText}
        </Col>
      </Row>
    </Container>
  );
};

EmojiTranslator.propTypes = {};

export default EmojiTranslator;
