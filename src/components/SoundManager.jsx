import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

const SoundManager = () => {
  const { initAudio } = useSound();
  const location = useLocation();

  useEffect(() => {
    const handleInteraction = () => {
      initAudio();
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [initAudio]);

  return null;
};

export default SoundManager;
