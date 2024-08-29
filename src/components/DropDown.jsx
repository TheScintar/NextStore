"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import accountIcon from '../../public/account.svg';
import menuDown from '../../public/menuDown.svg';
import styles from '../styles/NavBar/navBar.module.css';

const Dropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button
        className={styles.accountButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={accountIcon} alt="Account icon" />
        <Image src={menuDown} alt="Menu down icon" />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <Link href="/profile" className={styles.dropdownItem}>
            Profile
          </Link>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              onLogout(); 
              setIsOpen(false); 
            }} 
            className={styles.dropdownItem}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
