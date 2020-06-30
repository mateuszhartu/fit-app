import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';

const Layout: FunctionComponent<{}> = ({ children }) => <div className={styles.container}>{children}</div>;

export default Layout;
