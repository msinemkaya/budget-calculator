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

      {/* if the expenses' length is bigger than zero we display the clear all button */}
      {expenses.length > 0 && (
        <button className='btn' onClick={clearItems}>
          clear expenses
          <MdDelete className='btn-icon' />
        </button>
      )}
    </>
  );
}