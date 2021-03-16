import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Header = () => {
  const [dropdownTitle, setDropdownTitle] = useState('Training plans');
  return (
    <header>
      <nav className="navbar">
        <ul className={`nav ${styles.navList}`}>
          <li>
            <Link to="/" className={styles.LinkButton} onClick={() => setDropdownTitle('Training plans')}>
              Home
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/products' }} onClick={() => setDropdownTitle('Training plans')}>
              Products
            </Link>
          </li>
          <li className={`dropdown ${styles.headerDropdown}`}>
            {dropdownTitle}
            <ul className={`dropdown-menu ${styles.headerDropdownMenu}`} aria-label="submenu">
              <li>
                <Link to={{ pathname: '/training-plans/upper-body' }} onClick={() => setDropdownTitle('Upper body')}>
                  Upper body
                </Link>
              </li>
              <li>
                <Link to={{ pathname: '/training-plans/lower-body' }} onClick={() => setDropdownTitle('Lower body')}>
                  Lower body
                </Link>
              </li>
              <li>
                <Link to={{ pathname: '/training-plans/cardio' }} onClick={() => setDropdownTitle('Cardio')}>
                  Cardio
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={{ pathname: '/user/daily-diet' }} onClick={() => setDropdownTitle('Training plans')}>
              Diet
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/reports' }} onClick={() => setDropdownTitle('Training plans')}>
              Diet Reports
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/user/dimensions' }} onClick={() => setDropdownTitle('Training plans')}>
              Your body
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/add-product' }} onClick={() => setDropdownTitle('Training plans')}>
              Add product
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/add-training-plan' }} onClick={() => setDropdownTitle('Training plans')}>
              Custom training plan
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
