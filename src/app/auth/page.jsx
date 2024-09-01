'use client';

import React, { useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import styles from '../../styles/Auth/auth.module.css';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showNotification, setShowNotification] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed in successfully');
      setError(null);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      setError(err.message);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        shippingAddress: null,  
        cart: [],
      });

      console.log('Signed up successfully');
      setError(null);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use');
      } else {
        setError('Failed to sign up');
      }
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isLogin ? 'Login' : 'Registration'}</h2>
      <form onSubmit={isLogin ? handleLogin : handleRegistration}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {isLogin ? 'Login' : 'Registration'}
        </button>
      </form>
      <p>
        {isLogin ? 'Need an account?' : 'Already have an account?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)} className={styles.toggleLink}>
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
      {showNotification && (
        <div className={`${styles.notification} ${error ? styles.error : ''}`}>
          {error || (isLogin ? 'Logged in successfully!' : 'Registered successfully!')}
        </div>
      )}
    </div>
  );
};

export default AuthPage;
