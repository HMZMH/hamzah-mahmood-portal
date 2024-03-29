import React, { useState } from 'react';
import './BudgetCalculator.css';
import PieChart from './PieChart';

const colors = [
  'rgb(0, 123, 255)', // Blue
  'rgb(0, 173, 239)', // Sky Blue
  'rgb(0, 255, 255)', // Cyan
  'rgb(192, 192, 192)', // Silver
  'rgb(169, 169, 169)', // Dark Gray
  'rgb(70, 130, 180)', // Steel Blue
  'rgb(173, 216, 230)', // Light Blue
  'rgb(112, 128, 144)', // Slate Gray
  'rgb(70, 130, 180)', // Steel Blue
  'rgb(112, 147, 219)', // Medium Slate Blue
  'rgb(176, 224, 230)', // Powder Blue
];

const BudgetCalculator = () => {
  const [income, setIncome] = useState({
    'Wages': 0,
    'Cash-In-Hand': 0,
    'Selling Items': 0,
    'Benefits': 0,
    'Bursaries': 0,
    'Loans': 0,
    'Gifts': 0,
    'Investment Returns': 0,
    'Inheritance': 0,
  });

  const [expenses, setExpenses] = useState({
    'Council Tax': 0,
    'Employment Tax': 0,
    'National Insurance': 0,
    'Pension': 0,
    'Rent': 0,
    'Home Water': 0,
    'Home Gas': 0,
    'Home Electric': 0,
    'Household Maintenance': 0,
    'Mobile Contract': 0,
    'Internet Broadband': 0,
    'Home Entertainment': 0,
    'Grocery Shopping': 0,
    'Outside Entertainment': 0,
    'Outside Food': 0,
    'Gym Membership': 0,
    'Public Transport': 0,
    'Car Payments': 0,
    'Car Insurance': 0,
    'Car Fuel/Charge': 0,
    'Car Maintenance': 0,
    'Road Tax': 0,
    'Gifts': 0,
    'Investments': 0,
    'Miscellaneous': 0,
    'Charity Donations': 0,
    'Savings Account': 0,
    'Emergency Fund': 0,
    'Healthcare Expenses': 0,
    'Debt Repayments': 0,
    'Fines': 0,
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

  const addNewField = (category, type) => {
    if (type === 'income') {
      setIncome({ ...income, [category]: 0 });
    } else if (type === 'expenses') {
      setExpenses({ ...expenses, [category]: 0 });
    }
  };

  const deleteField = (category, type) => {
    if (type === 'income') {
      const updatedIncome = { ...income };
      delete updatedIncome[category];
      setIncome(updatedIncome);
    } else if (type === 'expenses') {
      const updatedExpenses = { ...expenses };
      delete updatedExpenses[category];
      setExpenses(updatedExpenses);
    }
  };

  const renameField = (oldCategory, newCategory, type) => {
    if (type === 'income') {
      const updatedIncome = { ...income };
      updatedIncome[newCategory] = updatedIncome[oldCategory];
      delete updatedIncome[oldCategory];
      setIncome(updatedIncome);
    } else if (type === 'expenses') {
      const updatedExpenses = { ...expenses };
      updatedExpenses[newCategory] = updatedExpenses[oldCategory];
      delete updatedExpenses[oldCategory];
      setExpenses(updatedExpenses);
    }
  };

  const updateBalance = (income, expenses) => {
    const incomeTotal = Object.values(income).reduce((acc, val) => acc + val, 0);
    const expensesTotal = Object.values(expenses).reduce((acc, val) => acc + val, 0);
    setBalance(incomeTotal - expensesTotal);
  };

  const formatCurrency = (amount) => {
    return `£${amount.toFixed(2)}`;
  };

  const resetFields = () => {
    const resetIncome = Object.keys(income).reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    const resetExpenses = Object.keys(expenses).reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    setIncome(resetIncome);
    setExpenses(resetExpenses);
    updateBalance(resetIncome, resetExpenses);
  };

  // Create data for the pie charts with labels and percentages
  const incomeData = Object.keys(income).map((category, index) => {
    return { label: category, percentage: income[category], color: colors[index % colors.length] };
  });

  const expensesData = Object.keys(expenses).map((category, index) => {
    return { label: category, percentage: expenses[category], color: colors[index % colors.length] };
  });

  return (
    <div>
      <div className="budget-calculator">
        <div className="column">
          <h2>Income</h2>
          {Object.entries(income).map(([category, value]) => (
            <div className="input-container" key={category}>
              <div className="input-field">
                <div style={{ width: '250px' }}>
                  <label>{category}: </label>
                </div>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleIncomeChange(category, parseFloat(e.target.value))}
                />
                <button className="delete-icon" onClick={() => deleteField(category, 'income')}>&#x1F5D1;</button>
                <button className="rename-icon" onClick={() => renameField(category, prompt('New name:'), 'income')}>&#x270E;</button>
              </div>
            </div>
          ))}
          <button className="add-new-field" onClick={() => addNewField('newIncomeField', 'income')}>
            + New
          </button>
        </div>

        <div className="column">
          <h2>Expenses</h2>
          {Object.entries(expenses).map(([category, value]) => (
            <div className="input-container" key={category}>
              <div className="input-field">

                <div style={{ width: '250px' }}>
                  <label>{category}: </label>
                </div>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleExpensesChange(category, parseFloat(e.target.value))}
                />
                <button className="delete-icon" onClick={() => deleteField(category, 'expenses')}>&#x1F5D1;</button>
                <button className="rename-icon" onClick={() => renameField(category, prompt('New name:'), 'expenses')}>&#x270E;</button>
              </div>
            </div>
          ))}
          <button className="add-new-field" onClick={() => addNewField('newExpensesField', 'expenses')}>
            + New
          </button>
        </div>

        <div className="column">
          <h2>Balance</h2>
          <label>Total Income:</label>
          <p>{formatCurrency(Object.values(income).reduce((acc, val) => acc + val, 0))}</p>
          <label>Total Expenses:</label>
          <p>{formatCurrency(Object.values(expenses).reduce((acc, val) => acc + val, 0))}</p>
          <label>Remaining:</label>
          <div className="balance">
            <br />
            <p style={{ fontSize: '20px', color: 'darkcyan' }}>{formatCurrency(balance)}</p>
          </div>
          <button className="add-new-field" onClick={resetFields}>
            Reset
          </button>
          <br /><br />
        </div>
      </div>

      <div className="calculator-charts">
        <div className="pie-chart">
          <PieChart data={incomeData} canvasId="incomeChart" />
        </div>

        <div className="pie-chart">
          <PieChart data={expensesData} canvasId="expensesChart" />
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
