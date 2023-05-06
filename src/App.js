import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';

// we get the items from the local storage with the key of 'expenses'and parse them. If there is not such a key
// we create an empty array with that key
const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [amount, setAmount] = useState('');
  const [charge, setCharge] = useState('');
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  // we set the items on the 'expenses' in local storage every time expenses' value changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // we pass this function through the ExpenseForm to use it to get the charge inputs value whenever it is changed
  const handleCharge = ({ target }) => {
    setCharge(target.value);
  };

  // we pass this function through the ExpenseForm to use it to get the amount inputs value whenever it is changed
  const handleAmount = ({ target }) => {
    setAmount(target.value);
  };

  // we use this function to show the Alert that we created for 2 seconds with the type (success or danger) and the text inside of it
  const handleAlert = ({ type, text }) => {
    //we set the show to true and pass in the type and text value that we got as well
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if charge inputs value is not an empty string and the amount is bigger than zero;
    if (charge !== '' && amount > 0) {
      // we first look if the user wants to edit something or add something new
      // if they are editing we map the expenses and find the item with the id of the expense that user wants to edit
      // then we change the charge and the amount value and get the rest of the object (id in this case so that the
      // id will be the same and it will not add a new item but rather will edit the existing one)
      // and we pass the rest of the items without touching them
      if (edit) {
        let tempExpenses = expenses.map((item) =>
          item.id === id ? { ...item, charge, amount } : item
        );

        // we set the new array that we created with the edited values to the expenses and also set edit value to the false
        setExpenses(tempExpenses);
        setEdit(false);
      } else {
        // else if edit is false and user doesnt want to edit something we create a new expense with a
        // uuid id, charge and amount that given and with set method we add it to the existing expenses
        // also we call the handleAlert and pass success as a type and a text to show that an item has been added
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: 'item added' });
      }

      // either button is in edit state or not we set the charge and amount input to empty strings to clear out the
      // input areas
      setCharge('');
      setAmount('');
    } else {
      // if the amount is not bigger than zero or the charge input is empty then we call the handleAlert function
      // with the type of danger and let the user know that they cant add a new expense like that
      handleAlert({
        type: 'danger',
        text: `charge can't be an empty value and amount has to be bigger than zero`,
      });
    }
  };

  // to clear all the items from expenses
  const clearItems = () => {
    setExpenses([]);
  };

  // to clear the item with the given id we create a new array with filter
  // without the expense withthat id and set the new array using setter function
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
  };

  // to edit an item we fin the item with given id with find method and with
  // destruction we get the charge and amount values of of it. we set the charge and amount
  // input areas to that value and set edit to true to handle it on handleSubmit function
  // and also pass the id as well
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {/* if alerts show keys value is true than we show an alert */}
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        {/* we use reduce method to get all of the expenses amounts and reduce them into one value */}
        Total Spending:{' '}
        <span className='total'>
          ${expenses.reduce((acc, curr) => (acc += parseInt(curr.amount)), 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
