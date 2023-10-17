import React, { useState } from 'react';
import { auth } from '../Firebase'; // Import the 'auth' object
import { createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Password length and complexity check
    if (password.length < 6 || !/\d/.test(password)) {
      setErrorMessage("Password should be at least 6 characters and contain numbers.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful, you can navigate to the dashboard or perform other actions here.
        const user = userCredential.user;
      })
      .catch((error) => {
        // Handle registration errors, e.g., display an error message to the user.
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <h2>Register</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errorMessage && <p>{errorMessage}</p>} {/* Display error message if available */}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Registration;