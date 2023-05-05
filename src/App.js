import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Alert from './components/Alert'
import uuid from 'uuid'
import { useState } from 'react'

function App() {

  const [expenses, setExpenses] = useState([])

  return (
    <>
      <Alert />
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm/>
        <ExpenseList expenses={expenses}/>
      </main>
      <h1>
        Total Spending: <span className='total'>${expenses.reduce((acc, curr) => (
          acc += curr.amount
        ), 0)}</span>
      </h1>
    </>
  );
}

export default App;
