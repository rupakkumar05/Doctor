import { useState } from 'react';
import './AddDoctorPage.css';

export default function AddDoctor() {
  const [form, setForm] = useState({
    name: '',
    specialization: '',
    experience: '',
    location: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/add-doctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    // Clear the input fields after successful submission
    setForm({ name: '', specialization: '', experience: '', location: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="add-doctor-form">
      <h1>Add Doctor</h1>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Specialization"
        value={form.specialization}
        onChange={e => setForm({ ...form, specialization: e.target.value })}
      />
      <input
        placeholder="Experience (years)"
        type="number"
        value={form.experience}
        onChange={e => setForm({ ...form, experience: e.target.value })}
      />
      <input
        placeholder="Location"
        value={form.location}
        onChange={e => setForm({ ...form, location: e.target.value })}
      />

      <button type="submit">Add Doctor</button>
    </form>
  );
}
