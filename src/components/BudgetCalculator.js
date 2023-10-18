import React, { useState } from 'react';
import './BudgetCalculator.css'; // Make sure to import your stylesheet

const BudgetCalculator = () => {
  const [income, setIncome] = useState({
    wages: 0,
    gifts: 0,
    inheritance: 0,
  });

  const [expenses, setExpenses] = useState({
    rentMortgage: 0,
    water: 0,
    gas: 0,
    electric: 0,
    mobile: 0,
    tv: 0,
    broadband: 0,
    car: 0,
    petrol: 0,
    carInsurance: 0,
  });

  const [balance, setBalance] = useState(0);

  const handleIncomeChange = (category, value) => {
    setIncome({ ...income, [category]: value });
    updateBalance({ ...income, [category]: value }, expenses);
  };

  const handleExpensesChange = (category, value) => {
    setExpenses({ ...expenses, [category]: value });
    updateBalance(income, { ...expenses, [category]: value });
  };

  const updateBalance = (income, expenses) => {
    const incomeTotal = Object.values(income).reduce((acc, val) => acc + val, 0);
    const expensesTotal = Object.values(expenses).reduce((acc, val) => acc + val, 0);
    const newBalance = incomeTotal - expensesTotal;
    setBalance(newBalance);
  };

  const formatCurrency = (amount) => {
    return `£${amount.toFixed(2)}`;
  };

  return (
    <div className="budget-calculator">
      <div className="column">
        <h2>Income</h2>
        <div className="input-container">
          <label>Wages:</label>
          <input
            type="number"
            value={income.wages}
            onChange={(e) => handleIncomeChange('wages', parseFloat(e.target.value))}
          />
        </div>
        <div className="input-container">
          <label>Gifts:</label>
          <input
            type="number"
            value={income.gifts}
            onChange={(e) => handleIncomeChange('gifts', parseFloat(e.target.value))}
          />
        </div>
        <div className="input-container">
          <label>Inheritance:</label>
          <input
            type="number"
            value={income.inheritance}
            onChange={(e) => handleIncomeChange('inheritance', parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="column">
        <h2>Expenses</h2>
        {Object.keys(expenses).map((category) => (
          <div className="input-container" key={category}>
            <label>{category}:</label>
            <input
              type="number"
              value={expenses[category]}
              onChange={(e) => handleExpensesChange(category, parseFloat(e.target.value))}
            />
          </div>
        ))}
      </div>
      <div className="column">
        <h2>Balance</h2>
        <div className="balance">
          <h3>Balance:</h3>
          <p>{formatCurrency(balance)}</p>
        </div>
      </div>
      <div className="chart">
        {/* You can add your chart component here */}
      </div>
    </div>
  );
};

export default BudgetCalculator;
