'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getProductById } from '../../../firebase/firebase';
import { fetchProduct } from '../../../API/productAPI'; 

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const path = usePathname();
  
 
  const [category, productId] = path.split('/').slice(-2);

  useEffect(() => {
      if (category && productId) {
      fetchProduct(category, productId).then((fetchedProduct) => {
        try {
            setProduct(fetchedProduct);
          } catch (err) {
            setError('Failed to fetch product');
          } finally {
            setLoading(false);
          }
      });
    }
    
      
  }, [category, productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.imageURL && <img src={product.imageURL} alt={product.title} />}
    </div>
  );
};

export default ProductDetail;
