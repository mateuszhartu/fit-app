import React, { useState, ReactElement } from 'react';

interface ToggleProps {
  toggle: (show: () => void) => ReactElement;
  content: (hide: () => void) => ReactElement;
}

const ToggleContent = ({ toggle, content }: ToggleProps) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {isShown && content(hide)}
    </>
  );
};

export default ToggleContent;
