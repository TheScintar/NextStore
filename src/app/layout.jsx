import React from 'react';
import '../styles/global.css'; 
import Navbar from '../components/Navbar'
import GithubIcon from '../../public/github.svg'
import Image from 'next/image';
import styles from '../styles/mainPage.module.css'
import Link from 'next/link';


export const metadata = {
  title: 'NextStore',
  description: 'Home page of NextStore',
};



const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
          <link rel="icon" href="../../public/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,900;1,900&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <header>
          <Navbar/>
        </header>
        <main>{children}</main>
        <footer>
          <p>Uladzislau Tryfanau</p>
          <div>
            <Link target='blank' href='https://github.com/TheScintar'>
            <Image src={GithubIcon} className={styles.icon}/>
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
