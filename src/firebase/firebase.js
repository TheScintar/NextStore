import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export const getProducts = async (category) => {
  console.log(category)
  const productsCollection = collection(db, `${category}`);
  const productsSnapshot = await getDocs(productsCollection);
  return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const getProductById = async (category, productId) => {
  try {
    const productDoc = doc(db, category, productId);
    const docSnap = await getDoc(productDoc);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};


export const addToCart = async (product) => {
  const user = auth.currentUser;

  if (user) {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        cart: arrayUnion(product) // Добавляем продукт в массив корзины
      });
      console.log('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  } else {
    console.log('User is not authenticated');
  }
};

export const removeFromCart = async (productId) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        cart: arrayRemove({ id: productId }) // Удаляем объект с этим id из массива
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }
};