const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const dbUrl = process.env.ATLASDB_URL;
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Optional: Log MongoDB queries
// mongoose.set('debug', true);

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
});

const Doctor = mongoose.model('Doctor', doctorSchema); 

// Route: Add Doctor
app.post('/add-doctor', async (req, res) => {
  try {
    console.log('📥 Incoming data:', req.body);
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.send({ message: '✅ Doctor added successfully' });
  } catch (err) {
    console.error('❌ Add doctor error:', err);
    res.status(500).send({ error: 'Failed to add doctor' });
  }
});

// Route: List Doctors with Filter + Pagination
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

// Start Server
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

