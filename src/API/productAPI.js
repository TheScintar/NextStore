import { getProducts, getProductById } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase'; 

export const fetchProducts = async (category) => {
  const fetchedProducts = await getProducts(category); 
  return fetchedProducts; 
};

export const fetchProduct = async (category, productId) => {
      const fetchedProduct = await getProductById(category, productId);
      return fetchedProduct
}

export const fetchBrandsFromProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "laptops"));
    const brands = new Set();
    querySnapshot.forEach((doc) => {
      brands.add(doc.data().brand);
    });
    return Array.from(brands);
  };

