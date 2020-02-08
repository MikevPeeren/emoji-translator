// React
import React, { useState } from 'react';

import PropTypes from 'prop-types';

// React Bootstrap
import { Container, Row, Col, Input, InputGroup } from 'reactstrap';

// CSS
import './emojiTranslator.scss';

// Emoji Library
const emojilib = require('emojilib');

const EmojiTranslator = () => {
  const allEmojis = emojilib.lib;

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          {/* <InputGroup> */}
          <Input
            className="text-input"
            placeholder="Text to Translate to Emoji's"
            type="textarea"
            name="text"
            id="translateText"
            onChange={event => {}}
          />
          {/* </InputGroup> */}
        </Col>
      </Row>
    </Container>
  );
};

EmojiTranslator.propTypes = {};

export default EmojiTranslator;
