import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import { auth } from './Firebase';

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
      <h2>{user ? `Welcome, ${user.email}` : 'Your App Name'}</h2>
      {user ? (
        <Dashboard />
      ) : (
        <div>
          <Login />
          <Registration />
        </div>
      )}
    </div>
  );
}

export default App;
