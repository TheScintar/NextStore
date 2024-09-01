'use client';

import React, { useEffect, useState } from 'react';

import styles from '../../styles/category.module.css'; 

import Link from 'next/link';

const Category = () => {
  
  return (
  <div className={styles.container}>
    <h2>Categories</h2>
      <div className={styles.categories}>
        
        <div className={styles.category}>
          <Link href="/category/laptops">Laptops</Link>
        </div>
        <div className={styles.category}>
          <Link href="/category/phones">Phones</Link>
        </div>
        <div className={styles.category}>
          <Link href="/category/watches">Watches</Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
