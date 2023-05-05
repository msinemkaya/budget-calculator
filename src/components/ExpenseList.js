import ExpenseItem from "./ExpenseItem";
import {MdDelete} from 'react-icons/md'

export default function ExpenseList({ expenses, clearItems, handleEdit, handleDelete }){
  return(
    <>
      <ul className='list'>
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit}/>
        ))}
      </ul>

      {expenses.length > 0 && (
        <button className='btn' onClick={clearItems}>
          clear expenses
          <MdDelete className='btn-icon' />
        </button>
      )}
    </>
  );
}