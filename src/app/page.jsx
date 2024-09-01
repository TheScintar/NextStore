'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchRecommendedProducts } from '../API/productAPI';
import styles from '../styles/mainPage.module.css';

const Home = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    fetchRecommendedProducts().then((productsData) => {
      setRecommendedProducts(productsData);
    });
  }, []);

  return (
    <div className={styles.container}>
      <nav>
        <Link href="/category/laptops">Laptops</Link>
        <Link href="/category/phones">Phones</Link>
        <Link href="/category/watches">Watches</Link>
      </nav>

      <h2>Recommended Products</h2>
      <div className={styles.recommendedProducts}>
        {recommendedProducts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <>
            {recommendedProducts.map((product) => (
              
                <div className={styles.recommendedProductCard}>
                  <Link href={`/category/${product.category}/${product.id}`} key={product.id}>
                  <div className={styles.productImage}>
                    {product.imageURL && <img src={product.imageURL} alt={product.title} />}
                  </div>
                  <div className={styles.recommendedProductTitle}>
              
                  {product.title}
                  </div>
                  <div className={styles.recommendedProductPrice}>
                   ${product.price}
                   </div>
                   </Link>
                </div>
              
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
