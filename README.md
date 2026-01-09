# Full-Stack Todo Application

A complete todo application built with **Spring Boot** (backend) and **React** (frontend) featuring user authentication, task management, and real-time updates.

## 🚀 Features

- **User Authentication**: JWT-based signup/login system
- **Task Management**: Create, read, update, delete tasks
- **Task Filtering**: Filter by priority, status, and sort options
- **Real-time Updates**: Instant task updates without page refresh
- **Responsive Design**: Works on desktop and mobile devices
- **In-Memory Storage**: Fast development setup with no database required

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.2.1**
- **Spring Security** (JWT Authentication)
- **Java 17**
- **Maven** (Build tool)
- **In-Memory Storage** (No database setup required)

### Frontend
- **React 18**
- **Axios** (HTTP client)
- **CSS3** (Styling)
- **Context API** (State management)

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 16** or higher
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd todo-app
```

### 2. Start the Backend
```bash
cd backend
# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-17
.\mvnw.cmd spring-boot:run

# Linux/Mac
export JAVA_HOME=/path/to/java-17
./mvnw spring-boot:run
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080

## 📁 Project Structure

```
todo-app/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/todoapp/
│   │   ├── config/         # Security configuration
│   │   ├── controller/     # REST API controllers
│   │   ├── dto/           # Data transfer objects
│   │   ├── entity/        # User entity (in-memory)
│   │   ├── repository/    # In-memory repositories
│   │   ├── security/      # JWT utilities
│   │   └── service/       # Business logic
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml            # Maven dependencies
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Authentication context
│   │   ├── App.js
│   │   └── index.js
│   └── package.json       # npm dependencies
├── clear-storage.html     # Browser storage cleanup tool
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Query Parameters for GET /api/tasks
- `priority`: Filter by priority (URGENT, NORMAL, LOW)
- `status`: Filter by status (DONE, IN_PROGRESS, NOT_STARTED, MISSED_DEADLINE)
- `sortBy`: Sort by field (createdAt, priority, status, deadline)

## 🎯 Usage

### 1. Create Account
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Enter username, email, and password
4. Click "Sign Up"

### 2. Login
1. Click "Login"
2. Enter your credentials
3. Click "Login"

### 3. Manage Tasks
1. Click "Add New Task"
2. Fill in task details:
   - Description (required)
   - Priority (Urgent, Normal, Low)
   - Status (Not Started, In Progress, Done, Missed Deadline)
   - Deadline (optional)
3. Click "Add Task"

### 4. Filter and Sort
- Use the filter dropdowns to filter by priority and status
- Use the sort dropdown to sort by different criteria

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Proper cross-origin resource sharing
- **Security Headers**: XSS protection and content type options

## 🐛 Troubleshooting

### Backend Won't Start
1. Ensure Java 17 is installed: `java -version`
2. Set JAVA_HOME environment variable
3. Clean and rebuild: `.\mvnw.cmd clean compile`

### Frontend Issues
1. Clear browser storage using `clear-storage.html`
2. Check if backend is running on port 8080
3. Restart frontend: `npm start`

### Authentication Issues
1. Open `clear-storage.html` in browser
2. Click "Clear All Storage"
3. Refresh the application

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
.\mvnw.cmd clean package
java -jar target/todo-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful frontend library
- JWT.io for JWT implementation guidance

---

**Happy Coding! 🎉**