# Job Application Tracker – Backend Developer Assignment

A full-stack job application tracking system with authentication, role-based access control, and a clean React frontend for API testing.



## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Node.js-22C55E?style=for-the-badge&logo=node.js&logoColor=ffffff" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/React-3B82F6?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/MongoDB-16A34A?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/JWT-F43F5E?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Bcrypt-60A5FA?style=for-the-badge&logo=bcrypt&logoColor=white" alt="Bcrypt"/>
  
</p>

## Features

### Backend (Primary)

- **Authentication System**: JWT-based authentication with secure password hashing using bcrypt
- **Role-Based Access Control**: User and Admin roles with protected routes
- **CRUD Operations**: Full Create, Read, Update, Delete for job applications
- **Validation & Error Handling**: Zod schema validation with comprehensive error responses
- **API Versioning**: Structured v1 API routes for scalability
- **Database Schema**: MongoDB with Mongoose ODM for data modeling
- **Pagination**: Efficient pagination for application lists

### Frontend (Basic UI)

- **Authentication**: Login and Register pages with form validation
- **Protected Dashboard**: User dashboard for managing job applications
- **Admin Panel**: Admin interface for user management (search and delete users)
- **CRUD Interaction UI**: Create, edit, and delete applications with real-time feedback
- **API Response Feedback**: Success and error message handling

---
## Product Walkthrough

### Authentication Screens

<table>
  <tr>
    <td>
      <img width="1920" height="1080" alt="Screenshot 2026-06-12 201919" src="https://github.com/user-attachments/assets/6db3c4aa-4bac-422c-9571-9684b47ec14e" />
    </td>
    <td>
      <img width="1920" height="1080" alt="Screenshot 2026-06-12 201910" src="https://github.com/user-attachments/assets/322eb370-133d-4a9d-82f1-2ab43c937d5a" />
    </td>
  </tr>
</table> 

---


### Application creation screen for tracking entries.
<table>
  <tr>
    <td><img width="400" alt="Screenshot 2026-06-12 201842" src="https://github.com/user-attachments/assets/4f378f30-f2c4-4674-b728-70e5776521d4" /></td>
    <td><img width="400" alt="Screenshot 2026-06-12 201829" src="https://github.com/user-attachments/assets/1f37e795-1407-4eb4-8e14-5a09bce8c896" /></td>
  </tr>
</table> 




---
### Admin panel for user management (search and delete users).

<img width="700" alt="Screenshot 2026-06-12 202126" src="https://github.com/user-attachments/assets/078bb6cc-9e46-4349-89ab-f1c31b76a238" />

---
### Security & Scalability

- **JWT Security**: Token-based authentication with proper expiration
- **Input Validation**: Request validation using Zod schemas
- **Scalable Folder Structure**: Modular architecture with separation of concerns
- **Middleware Pattern**: Reusable authentication and validation middleware
- **Error Handling**: Centralized error handling middleware

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone Repository

```bash
git clone <repository-url>
cd job-application-tracker
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Configure `.env` with your values:

```env
PORT=3000
BASE_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173
MONGO_URL=mongodb+srv://username:password@cluster0.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret_key_here
JWT_EXPIRES_IN=1h
```

Run backend:

```bash
npm run dev
```

Seed admin user (optional):

```bash
npm run seed:admin
```

Default admin credentials:
- Email: `admin@test.com`
- Password: `admin123`

### Frontend Setup

```bash
cd client
npm install
cp .env.example .env
```

Configure `.env`:

```env
VITE_BASE_URL=http://localhost:3000/api/v1
```

Run frontend:

```bash
npm run dev
```

### Access Points

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api/v1
- API Documentation: Add Swagger/Postman collection link here

## API Documentation

API endpoints are documented using Swagger. Access the documentation at:
```
http://localhost:3000/api-docs
```

### Key Endpoints

**Authentication**
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

**Applications**
- `GET /api/v1/applications` - Get user applications (with pagination)
- `POST /api/v1/applications` - Create new application
- `PATCH /api/v1/applications/:id` - Update application
- `DELETE /api/v1/applications/:id` - Delete application

**Admin**
- `GET /api/v1/admin/users/:id` - Get user by ID
- `DELETE /api/v1/admin/users/:id` - Delete user

## Project Structure

```
job-application-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── seed.js
│   │   ├── controllers/
│   │   │   ├── admin_controller.js
│   │   │   ├── application_controller.js
│   │   │   └── auth_controller.js
│   │   ├── docs/
│   │   │   ├── paths/
│   │   │   └── schema/
│   │   ├── middlewares/
│   │   │   ├── error_handler.js
│   │   │   ├── is_admin.js
│   │   │   ├── validate_middleware.js
│   │   │   └── verify_token.js
│   │   ├── models/
│   │   │   ├── application_model.js
│   │   │   └── user_model.js
│   │   ├── routes/
│   │   │   └── v1/
│   │   ├── schema/
│   │   │   ├── application_schema.js
│   │   │   └── auth_schema.js
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env
│   ├── .env.example
│   └── package.json
└── README.md
```

## Evaluation Criteria

- **API Design**: RESTful principles, proper HTTP methods, status codes
- **Security**: JWT implementation, password hashing, input validation
- **Database Design**: Proper schema design, relationships, indexing
- **Frontend Integration**: Clean UI, error handling, user experience
- **Scalability**: Modular code structure, separation of concerns
- **Code Quality**: Clean code, error handling, documentation

## License

This project is created as part of a backend developer assignment.
