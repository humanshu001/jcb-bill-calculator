import React from 'react'

export default function App() {
  const [entries, setEntries] = React.useState([{ hours: '', minutes: '' }]);
  const [rate, setRate] = React.useState('');
  const [bill, setBill] = React.useState(0);

  const handleEntryChange = (index, field, value) => {
    const updated = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updated);
  };

  const addEntry = () => setEntries([...entries, { hours: '', minutes: '' }]);
  const removeEntry = (index) => {
    if (entries.length === 1) return;
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleRateChange = (e) => setRate(e.target.value);

  const handleCalculate = () => {
    if (
      entries.some(e => e.hours === '' || e.minutes === '') ||
      rate === ''
    ) {
      alert('Please fill in all fields.');
      return;
    }
    const totalHours =
      entries.reduce(
        (acc, curr) =>
          acc + parseFloat(curr.hours) + parseFloat(curr.minutes) / 60,
        0
      );
    const totalBill = totalHours * parseFloat(rate);
    setBill(totalBill);
  };

  // Calculate total hours and minutes for display
  const totalMinutes = entries.reduce(
    (acc, curr) => acc + (parseInt(curr.hours || 0) * 60) + parseInt(curr.minutes || 0),
    0
  );
  const displayHours = Math.floor(totalMinutes / 60);
  const displayMinutes = totalMinutes % 60;

  return (
    <div className='p-3'>
      <h1 className="text-center text-4xl font-bold my-3">JCB Bill Calculator</h1>
      <div className="mt-7">
        {entries.map((entry, idx) => (
          <div key={idx} className="grid grid-cols-5 gap-3 mb-2">
            <div className='flex flex-col col-span-2'>
              <label>Hours:</label>
              <input
                type="number"
                value={entry.hours}
                onChange={e => handleEntryChange(idx, 'hours', e.target.value)}
              />
            </div>
            <div className='flex flex-col col-span-2'>
                <label>Minutes:</label>
              <input
                type="number"
                value={entry.minutes}
                onChange={e => handleEntryChange(idx, 'minutes', e.target.value)}
              />
              </div>
            <button
              className="ml-2 text-red-500 h-full flex items-end"
              onClick={() => removeEntry(idx)}
              disabled={entries.length === 1}
              style={{ alignSelf: 'center' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2-icon lucide-trash-2 mb-4"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        ))}
        <div className="w-4/5">
        <div className="bg-black text-yellow-500 text-3xl px-1 rounded-full w-10 h-10 flex justify-center items-center mx-auto" onClick={addEntry}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </div>
        </div>
      </div>
      <div className='flex flex-col mt-5'>
        <label htmlFor="rate">Rate:</label>
        <input type="number" name="rate" id="rate" value={rate} onChange={handleRateChange} />
      </div>
      <button className='bg-black text-white text-2xl p-4 mt-5 rounded-full hover:bg-blue-600 w-full' onClick={handleCalculate}>Calculate</button>

      {(bill > 0 || totalMinutes > 0) && (
        <div className='mt-5 text-center mb-10'>
          <h2 className='text-xl font-bold'>Total Time: {displayHours} hours {displayMinutes} minutes</h2>
          {bill > 0 && (
            <h2 className='text-3xl font-bold'>Total Bill: ₹{bill.toFixed(2)}</h2>
          )}
        </div>
      )}
      <footer className='text-center mt-5 fixed bottom-0 left-0 right-0 p-3'>
        <p className='text-sm'>Made with ❤️ by <a href="https://github.com/humanshu001" target="_blank" rel="noopener noreferrer">Humanshu Jaglan</a></p>
      </footer>
    </div>
  )
}