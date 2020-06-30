import React from 'react';

import styles from './styles.module.scss';

interface ModalProps {
  children: React.ReactNode;
  hide: () => void;
}

const Modal = ({ children, hide }: ModalProps) => {
  return (
    <div className={styles.Modal}>
      {/* eslint-disable-next-line */} // TODO podpytać
      <div className={styles.Backdrop} onClick={hide} role="button" />
      <div className={styles.ModalCard}>{children}</div>
    </div>
  );
};

export default Modal;
