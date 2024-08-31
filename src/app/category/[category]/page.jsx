'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ProductList from '../../../components/Product/ProductList';
import ProductFilter from '../../../components/Product/ProductFilter'; 
import { fetchProducts } from '../../../API/productAPI';
import styles from '../../../styles/category.module.css'; 
import Image from 'next/image';
import filtersIcon from '../../../../public/filters.svg';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const path = usePathname();
  const category = path.split('/').slice(-1)[0]; 
  const [FiltersIsOpen, setFiltersIsOpen] = useState(false); 

  useEffect(() => {
    setIsLoading(true); 
    fetchProducts(category)
      .then((productData) => {
        setProducts(productData);
        setFilteredProducts(productData);  
      })
      .finally(()=>{
        setIsLoading(false);
      });
  }, [category]); 

  const handleFilterChange = (filters) => {
    setIsLoading(true); 

    const { priceRange, selectedBrand } = filters;

    const filtered = products.filter(product => {
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrand === '' || product.brand === selectedBrand;
      return inPriceRange && matchesBrand;
    });

    setFilteredProducts(filtered);
    setIsLoading(false); 
  };

  const handleApplyFilters = () => {
    setFiltersIsOpen(false); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.productsPage}>
        <div className={styles.filterSidebar}>
          <ProductFilter onFilterChange={handleFilterChange} />
        </div>
        <div className={styles.mobileFilterSidebar}>
          <div className={styles.sort}>
            <h1>Sort</h1>
          </div>
          <div className={styles.filtersIcon} onClick={() => setFiltersIsOpen(!FiltersIsOpen)}>
            <Image src={filtersIcon} alt="Filters icon" />
            <h3>Filters</h3>
          </div>
          <ProductFilter 
            FiltersIsOpen={FiltersIsOpen} 
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
          />
        </div>
        <div className={styles.productListContainer}>
          <ProductList products={filteredProducts} isLoading={isLoading} category={category} />
        </div>
      </div>
    </div>
  );
};

export default Category;
