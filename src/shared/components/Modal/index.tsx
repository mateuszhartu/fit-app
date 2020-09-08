import React from 'react';

import styles from './styles.module.scss';

interface ModalProps {
  children: React.ReactNode;
  hide: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({ children, hide }) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.Backdrop} onClick={hide} role="button" aria-hidden="true" aria-label="modal backdrop" />
      <div className={styles.ModalCard}>{children}</div>
    </div>
  );
};

export default Modal;
