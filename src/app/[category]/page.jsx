'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ProductList from '../../components/ProductList';
import { fetchProducts } from '../../API/productAPI'; 

const Category = () => {
  const [products, setProducts] = useState([]);
  const path = usePathname();
  const category = path;

  useEffect(() => {
    fetchProducts(category).then((productData) => {
      setProducts(productData);
    });
  }, [category]); 

  return (
    <div>
      <ProductList products={products} category={category} />
    </div>
  );
};

export default Category;
