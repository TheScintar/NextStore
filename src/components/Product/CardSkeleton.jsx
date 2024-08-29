import React from 'react'
import styles from '../../styles/Product/CardSkeleton.module.css'

const CardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
        <div className={styles.productImage}>
            
        </div>
        <div className={styles.productInfo}>
            <div className={styles.productTitle}>
                
            </div>
            <div className={styles.productDescription}>
                
            </div>
        </div>
        <div className={styles.productPrice}>
            <div className={styles.price}>

            </div>
            <div className={styles.addButton}>

            </div>
        </div>
    </div>
  )
}

export default CardSkeleton
