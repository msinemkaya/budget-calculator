import { MdSend } from 'react-icons/md';

export default function ExpenseForm({
  // we get all the values that we passed on on the App.js 
  charge,
  amount,
  handleAmount,
  handleCharge,
  handleSubmit,
  edit
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='charge'>charge</label>
          <input
            type='text'
            className='form-control'
            id='charge'
            name='charge'
            placeholder='e.g. rent'
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>amount</label>
          <input
            type='number'
            className='form-control'
            id='amount'
            name='amount'
            placeholder='e.g. 600'
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>

      {/* if the edit is true than we display edit as a text otherwise we use submit as a text on the button */}
      <button type='submit' className='btn'>
        {edit ? 'edit': 'submit'}
        <MdSend className='btn-icon' />
      </button>
    </form>
  );
}
