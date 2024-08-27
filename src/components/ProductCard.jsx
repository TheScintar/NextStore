import React from 'react'
import styles from '../styles/productCard.module.css';
import Link from 'next/link';


const ProductCard = ({category, product, onAddToCart}) => {
  return (
   
    <div className={styles.productCard}>
        <div className={styles.productImage}>
            {product.imageURL && <img src={product.imageURL} alt={product.title} />}
        </div>
        <div className={styles.productInfo}>
            <Link href={`${category}/${product.id}`}><h3>{product.title}</h3></Link>
            <p>{product.description}</p>
        </div>
        <div className={styles.productPrice}>
            <p>Price: ${product.price}</p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductCard
