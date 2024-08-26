import React from 'react';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
