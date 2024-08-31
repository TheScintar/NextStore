import React, { useEffect } from 'react';
import styles from '../../styles/Cart/cart.module.css'; 
import closeIcon from '../../../public/close.svg';
import Image from 'next/image';

const CartItemCard = ({ product, onRemove, onQuantityChange }) => {
  useEffect(() => {
    if (!product.quantity) {
      onQuantityChange(product.id, 1);
    }
  }, [product, onQuantityChange]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      onQuantityChange(product.id, newQuantity);
      localStorage.setItem(`cartItem-${product.id}-quantity`, newQuantity);
    }
  };

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
        <div className={styles.quantityControl}>
          <input
            type="number"
            id={`quantity-${product.id}`}
            min="1"
            value={product.quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <p className={styles.price}>${(product.price * product.quantity).toFixed(2)}</p>
        <button onClick={() => onRemove(product.id)}>Remove</button>
        <div className={styles.mobileRemove} onClick={() => onRemove(product.id)}>
          <Image src={closeIcon} alt="Close icon" />
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
