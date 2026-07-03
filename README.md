# Nexora Solutions

Nexora Solutions is a modern full-stack web application built using the MERN stack. It provides a professional platform for showcasing completed projects, managing client project requests, collecting customer reviews, and offering a secure admin dashboard for managing the entire system.

## Features

### Public Website
- Responsive modern landing page
- Project showcase
- Services section
- Client reviews
- Project request form
- Contact information
- WhatsApp integration

### Project Requests
- Submit new project requests
- Upload project details
- Automatic request storage
- Admin status management
- Request tracking

### Reviews
- Submit customer reviews
- Review approval system
- Display only approved reviews
- Rating system

### Admin Dashboard
- Secure administrator login
- Dashboard statistics
- Manage projects
- Manage project requests
- Manage customer reviews
- Approve or reject reviews
- Update request status
- Delete requests
- Delete reviews
- Edit project information
- Drag and drop project organization

### Real-Time Features
- Socket.IO integration
- Live project updates
- Live review updates
- Live request updates

## Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- React Hot Toast
- Socket.IO Client
- DnD Kit

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Nodemailer
- Socket.IO
- Morgan
- Cookie Parser

## Project Structure

```
Nexora-Solutions/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/Nexora-Solutions.git
```

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

## API Endpoints

### Authentication

```
POST /api/auth/login
```

### Projects

```
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Requests

```
GET    /api/requests
POST   /api/requests
PUT    /api/requests/:id
DELETE /api/requests/:id
```

### Reviews

```
GET    /api/reviews
GET    /api/reviews/admin
POST   /api/reviews
PUT    /api/reviews/:id/approve
DELETE /api/reviews/:id
```

### Dashboard

```
GET /api/dashboard
```

## Future Improvements

- File upload support
- Email notifications
- Payment gateway integration
- Project search and filtering
- Analytics dashboard
- Dark mode
- User accounts
- Multi-admin support

## License

This project is developed for educational and portfolio purposes.

## Author

Poorna Kaushalya Gamage
