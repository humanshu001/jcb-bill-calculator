import React from 'react'

export default function App() {
  const [hours, setHours] = React.useState('');
  const [minutes, setMinutes] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [bill, setBill] = React.useState(0);

  const handleHoursChange = (e) => setHours(e.target.value);
  const handleMinutesChange = (e) => setMinutes(e.target.value);
  const handleRateChange = (e) => setRate(e.target.value);
  
  const handleCalculate = () => {
    if (hours !== "" && minutes !== "" && rate !== "") {
      const totalHours = parseFloat(hours) + parseFloat(minutes) / 60;
      const totalBill = totalHours * parseFloat(rate);
      setBill(totalBill);
    } else {
      alert('Please fill in all fields.');
    }
  };
  return (
    <div className='p-3'>
      <h1 className="text-center text-4xl font-bold my-3">JCB Bill Calculator</h1>
      {/* <p className="text-center">Enter the hours, minutes, and rate to calculate the bill.</p> */}
      <div className="grid grid-cols-2 gap-3 mt-7">
        <div className='flex flex-col '>
        <label htmlFor="hours">Hours:</label>
        <input type="number" name="hours" id="hours" value={hours} onChange={handleHoursChange} />
      </div>
      <div className='flex flex-col '>
        <label htmlFor="minutes">Minutes:</label>
        <input type="number" name="minutes" id="minutes" value={minutes} onChange={handleMinutesChange} />
      </div>
      </div>
      <div className='flex flex-col mt-5'>
        <label htmlFor="rate">Rate:</label>
        <input type="number" name="rate" id="rate" value={rate} onChange={handleRateChange} />
      </div>
      <button className='bg-black text-white text-2xl p-4 mt-5 rounded-full hover:bg-blue-600 w-full' onClick={handleCalculate}>Calculate</button>

      {bill > 0 && (
        <div className='mt-5 text-center'>
          <h2 className='text-3xl font-bold'>Total Bill: ₹{bill.toFixed(2)}</h2>
        </div>
      )}
      <footer className='text-center mt-5 absolute bottom-0 left-0 right-0 p-3'>
        <p className='text-sm'>Made with ❤️ by <a href="https://github.com/humanshu001" target="_blank" rel="noopener noreferrer">Humanshu Jaglan</a></p>
      </footer>
    </div>
  )
}
