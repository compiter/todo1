# To-Do List Application

A full-stack to-do list application with Spring Boot backend and React frontend.

## Features
- User login/signup
- Add tasks with description, priority, status, and deadline
- Sort tasks by priority, status, deadline
- Filter tasks by priority, status, deadline
- Remove tasks

## Tech Stack
- Backend: Spring Boot, Spring Security, JPA/Hibernate, H2 Database
- Frontend: React, JavaScript, Axios, Bootstrap

## Project Structure
```
├── backend/          # Spring Boot application
├── frontend/         # React application
└── README.md
```

## Getting Started

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

The backend runs on http://localhost:8080
The frontend runs on http://localhost:3000