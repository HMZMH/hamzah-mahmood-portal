import React, { useState } from 'react';
import { auth } from '../Firebase'; // Import the 'auth' object
import { signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful, you can navigate to the dashboard or perform other actions here.
        const user = userCredential.user;
      })
      .catch((error) => {
        // Handle login errors, e.g., display an error message to the user.
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p>{errorMessage}</p>} {/* Display error message if available */}
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;