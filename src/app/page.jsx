'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';



const Home = () => {
  

  return (
    <div>
        <Link href={"/category/laptops"}>Laptops</Link>
        <Link href={"/category/phones"}>Phones</Link>
        <Link href={"/category/watches"}>Watches</Link>
    </div>
  );
};

export default Home;
