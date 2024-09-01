'use client';

import React, { useEffect, useState } from 'react';
import { addToCart, isProductInCart } from '../../../../firebase/firebase'; 
import { usePathname } from 'next/navigation';
import { fetchProduct } from '../../../../API/productAPI'; 
import styles from '../../../../styles/Product/productDetail.module.css';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const path = usePathname();
  const [category, productId] = path.split('/').slice(-2);
  const [isInCart, setIsInCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchAndCheckProduct = async () => {
      if (category && productId) {
        try {
          const fetchedProduct = await fetchProduct(category, productId);
          setProduct(fetchedProduct);

          const result = await isProductInCart(fetchedProduct.id);
          setIsInCart(result);
        } catch (err) {
          setError('Failed to fetch product');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAndCheckProduct();
  }, [category, productId]);

  const handleAddToCart = () => {
    if (!isInCart && product) {
      addToCart(product);
      setIsInCart(true);
      setShowNotification(true);
    
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

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
            <div>
                {isInCart ? (
                  <button disabled className={styles.addToCart}>Already in Cart</button>
                ) : (
                  <button className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>
                )}
            </div>
        </div>
      </div>
      {showNotification && (
        <div className={styles.notification}>
          Product successfully added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
