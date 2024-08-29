"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import accountIcon from '../../public/account.svg';
import menuDown from '../../public/menuDown.svg'
import styles from '../styles/navBar.module.css';


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
        <Image src={menuDown} alt="menuDown"/>
      </button>
    
      {isOpen && (
        <div className={styles.dropdownMenu}>

            <button className={styles.dropdownItem}>
          <p><Link href="/profile">Profile</Link></p>
            </button>
          <button onClick={onLogout} className={styles.dropdownItem}>
          <p>Logout</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
