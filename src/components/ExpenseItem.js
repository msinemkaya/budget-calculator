import {MdEdit, MdDelete} from 'react-icons/md'

export default function ExpenseItem({ expense, handleEdit, handleDelete }){
  const {id, charge, amount} = expense
  return(
    <>
      <li className='item'>
        <div className='info'>
          <span className='expense'>{charge}</span>
          <span className="amount">${amount}</span>
        </div>
        <div className=''>
          {/* to pass the expenses id we are on, we dont directly call the handle methods but instead call them within a callback function */}
          <button className='edit-btn' onClick={e => handleEdit(id)}><MdEdit /></button>
          <button className='clear-btn' onClick={e => handleDelete(id)}><MdDelete /></button>
        </div>
      </li>
    </>
  );
}