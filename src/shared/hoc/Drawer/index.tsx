import React from 'react';
import styles from './styles.module.scss';

interface DrawerProps {
  children: React.ReactNode;
  close: () => void;
}

const Drawer: React.FunctionComponent<DrawerProps> = ({ children, close }) => {
  return (
    <>
      <div className={styles.Drawer}>
        <div className={styles.Backdrop} onClick={close} role="button" aria-hidden="true" aria-label="select Product" />
        <div className={styles.DrawerCard}>{children}</div>
      </div>
    </>
  );
};

export default Drawer;
