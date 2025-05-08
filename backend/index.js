const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const dbUrl = process.env.ATLASDB_URL;
mongoose.connect(dbUrl)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Doctor Schema & Model
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

// Routes

// 1. Add Doctor
app.post('/add-doctor', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send({ message: '✅ Doctor added successfully' });
  } catch (err) {
    console.error('❌ Add doctor error:', err);
    res.status(500).send({ error: 'Failed to add doctor' });
  }
});

// 2. List Doctors with optional filters and pagination
app.get('/list-doctor-with-filter', async (req, res) => {
  try {
    const { specialization, location, page = 1, limit = 5 } = req.query;
    const filter = {};
    if (specialization) filter.specialization = specialization;
    if (location) filter.location = location;

    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.send(doctors);
  } catch (err) {
    console.error('❌ List doctors error:', err);
    res.status(500).send({ error: 'Failed to fetch doctors' });
  }
});

// Default fallback route (optional)
app.get('/', (req, res) => {
  res.send({ message: '🟢 API is running' });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));