'use client';

import React, { useEffect, useState } from 'react';

import styles from '../../styles/category.module.css'; 

import Link from 'next/link';

const Category = () => {
  
  return (
    <div className={styles.container}>
        <Link href={"/category/laptops"}>Laptops</Link>
        <Link href={"/category/phones"}>Phones</Link>
        <Link href={"/category/watches"}>Watches</Link>
    </div>
  );
};

export default Category;
