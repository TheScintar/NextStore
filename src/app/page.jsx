'use client';

import React, { useEffect, useState } from 'react';

import { getProducts } from '../firebase/firebase'; 

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts(); 
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Home;
