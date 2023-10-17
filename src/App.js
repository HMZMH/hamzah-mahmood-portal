import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Registration from './components/Registration'; // Import the Registration component
import { auth } from './Firebase'; // Import the 'auth' object

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Your App Name</h1>
      {user ? (
        <Dashboard />
      ) : (
        <div>
          <Login />
          <Registration /> {/* Add the Registration component */}
        </div>
      )}
    </div>
  );
}

export default App;
