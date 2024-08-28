"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navBar.module.css';
import Image from 'next/image';
import menuIcon from '../../public/menu.svg';
import closeIcon from '../../public/close.svg'
import accountIcon from '../../public/account.svg'
import cartIcon from '../../public/cart.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
      <nav className={`${styles.navbar} ${isOpen ? styles.active : ''}`}>
        <div className={styles.menu}>
          <Link href="/">Home</Link>
          <Link href='/'>Test</Link>
        </div>
        <div className={styles.logo}>
            
                <button className={styles.closeButton} onClick={() => setIsOpen(!isOpen)}>
                   <Image src={closeIcon} alt="Close icon" />
                </button>
            
                <Link href="/"><h1>NextStore</h1></Link>
        </div>

        <div className={styles.mobileMenu}>
          <Link href="/">Home</Link>
          <Link href='/'>Test</Link>
        </div>

        <div className={styles.auth}>
            <Link href="/signin"><Image src={accountIcon} alt="Account icon"/></Link>
            <Link href="/signin">Login</Link>
            <Link href="/cart"><Image src={cartIcon} alt="Cart icon"/></Link>
            <Link href="/cart">Cart</Link>
        </div>
        
      </nav>



    <div className={styles.mobileNavbar}>
        <div className={styles.mobileLogo}>
          <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
            <Image src={menuIcon} alt="Menu icon" />
            </button>
            <Link href="/"><h1 className={styles.logo}> NextStore</h1></Link>
          </div>
        

        <div className={styles.mobileAuth}>
          <Link href="/signin"><Image src={accountIcon} alt="Account icon"/></Link>
          <Link href="/cart"><Image src={cartIcon} alt="Cart icon"/></Link>
        </div>
    </div>

    </>
  );
};

export default Navbar;
