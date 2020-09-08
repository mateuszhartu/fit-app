import React, { useState, ReactElement } from 'react';

interface ToggleProps {
  toggle: (show: () => void) => ReactElement;
  content: (hide: () => void) => ReactElement;
}

const ToggleContent: React.FunctionComponent<ToggleProps> = ({ toggle, content }) => {
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
