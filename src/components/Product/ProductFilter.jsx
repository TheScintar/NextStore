import React, { useState, useEffect } from 'react';
import styles from '../../styles/filter.module.css';
import { fetchBrandsFromProducts } from '../../API/productAPI';

const ProductFilter = ({ FiltersIsOpen, onFilterChange, onApplyFilters }) => {
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    fetchBrandsFromProducts().then((brandsList) => {
      setBrands(brandsList);
    });
  }, []);

  useEffect(() => {
    onFilterChange({ priceRange, selectedBrand });
  }, [priceRange, selectedBrand]);

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = e.target.value;
    setPriceRange(newRange);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  return (
    <div className={`${styles.filterContainer} ${FiltersIsOpen ? styles.active : ''}`}>
      <h3>Filters</h3>
      <div className={styles.filterSection}>
        <label htmlFor="minPrice">Min Price</label>
        <input
          type="number"
          id="minPrice"
          value={priceRange[0]}
          onChange={(e) => handlePriceChange(e, 0)}
        />
      </div>
      <div className={styles.filterSection}>
        <label htmlFor="maxPrice">Max Price</label>
        <input
          type="number"
          id="maxPrice"
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(e, 1)}
        />
      </div>
      <div className={styles.filterSection}>
        <label htmlFor="brand">Brand</label>
        <select id="brand" value={selectedBrand} onChange={handleBrandChange}>
          <option value="">All Brands</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.ApplyButton} onClick={onApplyFilters}>
        <h1>Apply</h1>
      </div>
    </div>
  );
};

export default ProductFilter;
