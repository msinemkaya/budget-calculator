import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [charge, setCharge] = useState('');
  const [alert, setAlert] = useState({ show: false });

  const handleCharge = ({ target }) => {
    setCharge(target.value);
  };

  const handleAmount = ({ target }) => {
    setAmount(target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({show:true, type, text})
    setTimeout(() => {
      setAlert({show:false})
    }, 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== '' && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      setCharge('');
      setAmount('');
      handleAlert({type:'success', text: 'item added'})
    }else {
      handleAlert({type:'danger', text:`charge can't be an empty value and amount has to be bigger than zero`})
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total Spending:{' '}
        <span className='total'>
          ${expenses.reduce((acc, curr) => (acc += parseInt(curr.amount)), 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
