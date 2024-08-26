'use client';

import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignUp: React.FC = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
    } catch (err) {
      setError('Failed to sign up');
      console.error('Error signing up:', err);
    }
  };

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;