import React from 'react';
import { Product as ProductType } from '../types';

interface ProductProps {
  product: ProductType;
}


const Product: React.FC<ProductProps> = ({ product }) => {
  const handleAddToCart = () => {
    console.log('Added to cart:', product);
  };

  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;