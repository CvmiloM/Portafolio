// src/components/TypewriterEffect.jsx

import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ phrases, typingSpeed = 150, deletingSpeed = 100, pauseTime = 1500 }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[currentPhraseIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(prev => currentPhrase.substring(0, prev.length + 1));
        if (currentText.length === currentPhrase.length) {
          timer = setTimeout(() => setIsDeleting(true), pauseTime);
        } else {
          timer = setTimeout(handleTyping, typingSpeed);
        }
      } else {
        setCurrentText(prev => currentPhrase.substring(0, prev.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex(prevIndex => (prevIndex + 1) % phrases.length);
          timer = setTimeout(handleTyping, 500);
        } else {
          timer = setTimeout(handleTyping, deletingSpeed);
        }
      }
    };
    timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="typewriter-text">
      {currentText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default TypewriterEffect;