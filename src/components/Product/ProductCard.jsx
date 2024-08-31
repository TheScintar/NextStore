import React, { useState, useEffect } from 'react';
import styles from '../../styles/Product/productCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import cartIcon from '../../../public/cart.svg';
import checkMark from '../../../public/checkMark.svg'
import { addToCart, isProductInCart } from '../../firebase/firebase'; 

const ProductCard = ({ category, product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkIfInCart = async () => {
      const result = await isProductInCart(product.id);
      setIsInCart(result);
    };
    
    checkIfInCart();
  }, [product.id]);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
      setIsInCart(true);
      setShowNotification(true);
    
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageAndInfo}>
        <div className={styles.productImage}>
          <Link href={`${category}/${product.id}`}>
            {product.imageURL && <img src={product.imageURL} alt={product.title} />}
          </Link>
        </div>
        <div className={styles.productInfo}>
          <Link href={`${category}/${product.id}`}>
            <h3>{product.title}</h3>
          </Link>
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
      <div className={styles.productPrice}>
        <p className={styles.price}>${product.price}</p>
        <div className={styles.mobileCart} onClick={handleAddToCart}>
            {isInCart ? (
               <Image src={checkMark} className={styles.checkMark} alt="Check mark" />
            ) : (
              <Image src={cartIcon} alt="Cart icon" />
            )}
        </div>
        {isInCart ? (
          <button disabled className={styles.inCartButton}>Already in Cart</button>
        ) : (
          <button onClick={handleAddToCart}>Add to Cart</button>
        )}
      </div>
      {showNotification && (
        <div className={styles.notification}>
          Product successfully added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
