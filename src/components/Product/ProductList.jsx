import React from 'react';
import ProductCard from './ProductCard'; 
import CardSkeleton from './CardSkeleton';
import styles from '../../styles/productsList.module.css';

const ProductList = ({ category, products, isLoading, onAddToCart }) => {
  return (
    <div className={styles.productsList}>
      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </>
      ) : (
        products.map(product => (
          <ProductCard key={product.id} category={category} product={product} onAddToCart={onAddToCart} className={styles.productCard} />
        ))
      )}
    </div>
  );
};

export default ProductList;
