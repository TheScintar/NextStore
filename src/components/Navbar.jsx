"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/NavBar/navBar.module.css';
import menuIcon from '../../public/menu.svg';
import closeIcon from '../../public/close.svg';
import cartIcon from '../../public/cart.svg';
import accountIcon from '../../public/account.svg';
import Dropdown from './Dropdown';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isOpen ? styles.active : ''}`}>
        <div className={styles.menu}>
          <Link href="/">Home</Link>
          <Link href="/">Test</Link>
        </div>
        <div className={styles.logo}>
          <button className={styles.closeButton} onClick={() => setIsOpen(!isOpen)}>
            <Image src={closeIcon} alt="Close icon" />
          </button>
          <Link href="/"><h1>NextStore</h1></Link>
        </div>

        <div className={styles.mobileMenu}>
          <Link href="/">Home</Link>
          <Link href="/">Test</Link>
        </div>

        <div className={styles.auth}>
          <Link href="/cart"><Image src={cartIcon} alt="Cart icon" /></Link>
          <Link href="/cart">Cart</Link>
          {user ? (
            <Dropdown onLogout={handleLogout} onClose={closeMenu} />
          ) : (
            <>
              <Link href="/signin"><Image src={accountIcon} alt="Account icon" /></Link>
              <Link href="/signin">Login</Link>
            </>
          )}
        </div>
      </nav>

      <div className={styles.mobileNavbar}>
        <div className={styles.mobileLogo}>
          <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
            <Image src={menuIcon} alt="Menu icon" />
          </button>
          <Link href="/"><h1 className={styles.logo}>NextStore</h1></Link>
        </div>

        <div className={styles.mobileAuth}>
          <Link href="/cart"><Image src={cartIcon} alt="Cart icon" /></Link>
          {user ? (
            <Dropdown onLogout={handleLogout} onClose={closeMenu} />
          ) : (
            <>
              <Link href="/signin"><Image src={accountIcon} alt="Account icon" /></Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
