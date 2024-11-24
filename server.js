require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes');
const patientRoutes = require('./src/routes/patientRoutes')
const appointmentRoutes = require('./src/routes/appointmentRoutes')

const app = express();

// Database connection
connectDB();


app.use(express.json());

app.use('/api/login', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/patients',patientRoutes);
app.use('/api/appointments',appointmentRoutes)



//Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Server running on port :',PORT)
})

