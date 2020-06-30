import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <ul className="nav">
          <li>
            <Link to="/" className={styles.LinkButton}>
              Home
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/products' }}>Products</Link>
          </li>
          <li>
            Training plans
            <ul className="dropdown" aria-label="submenu">
              <li>
                <Link to={{ pathname: '/training-plans/upper-body' }}>Upper body</Link>
              </li>
              <li>
                <Link to={{ pathname: '/training-plans/lower-body' }}>Lower body</Link>
              </li>
              <li>
                <Link to={{ pathname: '/training-plans/cardio' }}>Cardio</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={{ pathname: '/user/daily-diet' }}>Diet</Link>
          </li>
          <li>
            <Link to={{ pathname: '/user/training' }}>Your training</Link>
          </li>
          <li>
            <Link to={{ pathname: '/user/dimensions' }}>Your body</Link>
          </li>
          <li>
            <Link to={{ pathname: '/add-product' }}>Add product</Link>
          </li>
          <li>
            <Link to={{ pathname: '/add-training-plan' }}>Custom training plan</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
