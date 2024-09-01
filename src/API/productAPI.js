import { getProducts, getProductById, getAllProductsFromCategories} from '../firebase/firebase';
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

export const fetchRecommendedProducts = async () => {
  try {
    const categories = ['laptops', 'watches', 'phones'];
    const allProducts = await getAllProductsFromCategories(categories);

    const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
    const selectedProducts = shuffledProducts.slice(0, 6);
    
    return(selectedProducts)
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

