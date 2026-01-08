# 🚕 Taxi Booking Application

A full-stack taxi booking system featuring a modern React frontend and a robust Node.js/Express backend with PostgreSQL database integration.

## 🚀 Features

- **Real-time Fare Estimation**: Calculate trip costs based on distance and vehicle type.
- **Vehicle Selection**: Choose from various vehicle categories (Sedan, SUV, etc.).
- **Interactive Map Integration**: Powered by map routes for distance calculation.
- **Admin Dashboard**: Manage bookings and vehicle availability.
- **Secure Authentication**: JWT-based auth and password hashing.

## 🛠 Tech Stack

- **Frontend**: React, Vite, Framer Motion, Lucide Icons, Vanilla CSS (Utility-first).
- **Backend**: Node.js, Express.js.
- **ORM**: Sequelize.
- **Database**: PostgreSQL.
- **Validation**: Zod.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (Running locally)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd taxi2
```

### 2. Server Configuration
Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Configure `.env` file:
Ensure your `server/.env` file has the correct database credentials:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=taxi
DB_PORT=5432
```

### 3. Database Setup
Ensure PostgreSQL is running and create a database named `taxi`:
```sql
CREATE DATABASE taxi;
```
The server will automatically sync models and seed initial data (Routes and Vehicles) on the first run.

### 4. Client Configuration
Navigate to the client directory:
```bash
cd ../client
```

Install dependencies:
```bash
npm install
```

---

## 🏃‍♂️ How to Run

### Development Mode

**Start Backend Server:**
```bash
cd server
npm run dev
```
The server will run on [http://localhost:5000](http://localhost:5000).

**Start Frontend Client:**
```bash
cd client
npm run dev
```
The client will run on [http://localhost:5173](http://localhost:5173).

### Production Build

**Build for Production:**
```bash
cd client
npm run build
```
The production-ready files will be in the `dist` folder.

---

## 📂 Project Structure

- `client/`: React frontend application.
- `server/`: Express backend API.
  - `src/config/`: Database configuration.
  - `src/models/`: Sequelize models.
  - `src/routes/`: API endpoint definitions.
  - `src/index.js`: Main entry point and data seeding.
