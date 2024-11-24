Patient Management System

This is a web application for managing patient records, appointments, and consultations for an orthodontist practice. The system allows different roles (Patients, Doctors, and Admins) to perform specific actions based on role-based access control.

### Features:
- Patient Record Management (CRUD operations)
- Appointment Booking System (with role-based access control)
- JWT Authentication for secure login
- Role-based Access Control (Patient, Doctor, Admin)

## Prerequisites

To run this application, you will need the following software installed:

1. Node.js (version 14.x or above) - https://nodejs.org/
2. MongoDB (or a MongoDB cloud service like MongoDB Atlas) - https://www.mongodb.com/try/download/community

## Installation

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

Clone this repository to your local machine.

git clone https://github.com/yashg714/Patient-Management-System.git

### 2. Install Dependencies

Navigate to the project folder and run the following command to install the required dependencies:

cd patient-management-system
npm install

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and configure the necessary environment variables. 

Here is an example of the `.env` file:

PORT=3000
MONGO_URI=mongodb://localhost:27017/patient_management
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h

- PORT: The port on which the server will run (default is 3000).
- MONGO_URI: The MongoDB connection string for your local or cloud database (MongoDB Atlas for cloud).
- JWT_SECRET: A secret key for signing JWT tokens (ensure it’s kept secret).
- JWT_EXPIRATION: Token expiration time (default is 1 hour).

### 4. Set Up MongoDB

Ensure that you have MongoDB running either locally or on MongoDB Atlas.

For local MongoDB, you can start it with:

mongod

For MongoDB Atlas, create a free cluster and get your connection string. Replace MONGO_URI in the .env file with your Atlas connection string.

### 5. Run the Application

Once all dependencies are installed and the environment is set up, you can start the application by running:

npm start

This will start the server on http://localhost:3000 (or the port specified in .env).

### 6. Accessing the Application

Once the server is running, you can access the API endpoints via Postman or any HTTP client.

- Patient Registration: POST api/patients/ (Admin or Doctor)
- Patient Record Management: GET api/patients/:email (Patient, Doctor, Admin)
- Create Appointment: POST api/appointments/ (Patient)
- Appointment Viewing and Management: GET api/appointments/ (Patient, Doctor, Admin)

### 7. JWT Authentication

- To authenticate, send a POST request to /api/login with the following body:

{
    "email": "user@example.com",
    "password": "your-password"
}


### 8. Postman Collection

You can import the provided Postman Collection to test all the API endpoints.

### 9. API Documentation

#### Authentication

- POST /api/login  
  Login and get a JWT token. Required fields: `email`, `password`.

#### Patient Records

- POST /api/patients/ (Admin, Doctor)  
  Create a new patient record.

- GET /api/patients/:email (Patient for own record, Doctor for assigned patients, Admin for all records)  
  View a patient’s record.

- PUT /api/patients/:email (Doctor for assigned patients, Admin for all records)  
  Update a patient’s record.

- DELETE /api/patients/:email (Admin only)  
  Delete a patient’s record.

#### Appointments

- POST /api/appointments/ (Patient)  
  Create an appointment.

- GET /api/appointments/ (Patient for own appointments, Doctor for assigned, Admin for all)  
  View appointments.

- PUT /api/appointments/:email (Patient for own, Doctor for assigned, Admin for all)  
  Update an appointment.

- DELETE /api/appointments/:email (Patient for own, Admin for all)  
  Delete an appointment.

---

## Project Structure

patient-management-system/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js        # Authentication controller
│   │   ├── patientController.js     # Patient record controller
│   │   └── appointmentController.js # Appointment management controller
│   ├── models/
│   │   ├── user.js                 # User model (Patient, Doctor, Admin)
│   │   ├── patient.js              # Patient record model
│   │   └── appointment.js          # Appointment model
│   ├── routes/
│   │   ├── authRoutes.js           # Authentication routes
│   │   ├── patientRoutes.js        # Patient routes
│   │   └── appointmentRoutes.js    # Appointment routes
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT Authentication middleware
│   │   ├── roleMiddleware.js       # Role-based access control middleware
│   │   └── validationMiddleware.js # Validation middleware (using Joi)
│   └── config/
│       └── db.js                   # MongoDB connection setup
│
├── .env                            # Environment variables
├── package.json                    # NPM dependencies and scripts
├── README.md                       # Project setup and documentation
└── server.js                       # Server setup and initialization

