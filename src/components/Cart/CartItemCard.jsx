// src/components/CartItemCard.jsx

import React from 'react';
import styles from '../../styles/Product/productCard.module.css'; 

const CartItemCard = ({ product, onRemove }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageAndInfo}>
        <div className={styles.productImage}>
          <img src={product.imageURL} alt={product.title} />
        </div>
        <div className={styles.productInfo}>
          <h3>{product.title}</h3>
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
      <div className={styles.productPrice}>
        <p className={styles.price}>${product.price}</p>
        <button onClick={() => onRemove(product.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItemCard;
