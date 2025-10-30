
import React, { useState } from 'react';

const PlannerForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date) return alert("Title and Date are required");

    const newTask = {
      id: Date.now(),
      title,
      date,
      note
    };

    onAdd(newTask);

    setTitle('');
    setDate('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-3">
      <input 
        type="text" 
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border px-2 py-1 w-full"
        required
      />
      <input 
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="border px-2 py-1 w-full"
        required
      />
      <textarea 
        placeholder="Extra notes"
        value={note}
        onChange={e => setNote(e.target.value)}
        className="border px-2 py-1 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
        Add to Planner
      </button>
    </form>
  );
};

export default PlannerForm;
