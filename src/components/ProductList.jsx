import React, { useState } from 'react';
import ProductFilter from './ProductFilter'; 
import ProductCard from './ProductCard'; 
import styles from '../styles/productsList.module.css';

const ProductList = ({ category, products, onAddToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (filters) => {
    const { priceRange, selectedBrand } = filters;

    const filtered = products.filter(product => {
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrand === '' || product.brand === selectedBrand;
      return inPriceRange && matchesBrand;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className={styles.container}>
      <div className={styles.productsPage}>
        <div className={styles.filterSidebar}>
          <ProductFilter onFilterChange={handleFilterChange} />
        </div>
        <div className={styles.productsList}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} category={category} product={product} onAddToCart={onAddToCart} className={styles.productCard} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
