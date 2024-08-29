'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { fetchProduct } from '../../../../API/productAPI'; 
import styles from '../../../../styles/productDetail.module.css';

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
    <div className={styles.productContainer}>
      <div className={styles.imageSection}>
        <div className={styles.mainImage}>
          <img src={product.imageURL} alt={product.title} />
        </div>
      </div>
      <div className={styles.detailsSection}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.priceAddtoCart}>
           <h1 className={styles.price}>
              ${product.price}
            </h1>
            <button className={styles.addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
