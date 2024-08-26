'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getProductById } from '../../firebase/firebase';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const path = usePathname();
  const productId = path;

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await getProductById(productId);
          setProduct(fetchedProduct);
        } catch (err) {
          setError('Failed to fetch product');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
    </div>
  );
};

export default ProductDetail;
