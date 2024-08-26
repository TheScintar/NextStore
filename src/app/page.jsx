'use client';

import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
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
      <ProductList products={products} />
    </div>
  );
};

export default Home;
