import React, { useRef } from 'react';

const SoundButton = ({ onClick, children, ...props }) => {
  const soundRef = useRef(new Audio('/click.mp3'));

  const handleClick = (e) => {
    soundRef.current.currentTime = 0;
    soundRef.current.play().catch(() => {});
    if (onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default SoundButton;
