import React from 'react';
import ProductCard from './ProductCard'; 
import CardSkeleton from './CardSkeleton';
import styles from '../../styles/Product/productsList.module.css';

const ProductList = ({ category, products, isLoading}) => {
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
          <ProductCard key={product.id} category={category} product={product} className={styles.productCard} />
        ))
      )}
    </div>
  );
};

export default ProductList;
