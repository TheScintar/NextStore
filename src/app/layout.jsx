import React from 'react';
import '../styles/global.css'; 
import Navbar from '../components/Navbar'



export const metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}


const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
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
          <p>&copy; 2024 Online Store</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
