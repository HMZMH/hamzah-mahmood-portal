import React from 'react';
import { auth } from '../Firebase'; // Import the 'auth' object
import BudgetCalculator from './BudgetCalculator'; // Import your existing BudgetCalculator component
import './Dashboard.css';

const Dashboard = () => {
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error occurred during sign-out.
        console.error(error);
      });
  };

  return (
    <div className="dashboard-div">
      <div style={{textAlign:'end', marginTop:'-80px'}}>
        <button className='sign-out-button' onClick={handleSignOut}>Sign Out</button>
      </div>
      <br/>
      <BudgetCalculator />
    </div>
  );
};

export default Dashboard;