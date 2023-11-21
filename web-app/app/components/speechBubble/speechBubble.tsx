import React from 'react';
import './speechBubble.css';

const SpeechBubble = (props: { text: string }) => {
  return (
    <div>
      <div className="bubble"><p className="textBubble">{props.text}</p></div>
      <div className="pointer"></div>
    </div>

  )
}

export default SpeechBubble;
