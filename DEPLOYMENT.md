# Deployment Guide

## 🚀 How to Upload to GitHub

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `fullstack-todo-app`
4. Make it public or private
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Initialize Git in Your Project
```bash
# Navigate to your project root
cd C:\Users\HP\OneDrive\New folder\html\Documents\Desktop\todo1

# Initialize git
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Full-stack Todo App with Spring Boot and React"
```

### Step 3: Connect to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/fullstack-todo-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Live Deployment Options

### Option 1: Heroku (Free Tier Available)

#### Backend (Spring Boot)
1. Create `Procfile` in backend folder:
```
web: java -jar target/todo-backend-0.0.1-SNAPSHOT.jar --server.port=$PORT
```

2. Update `application.properties`:
```properties
server.port=${PORT:8080}
```

3. Deploy:
```bash
heroku create your-todo-backend
git subtree push --prefix backend heroku main
```

#### Frontend (React)
1. Build the app:
```bash
cd frontend
npm run build
```

2. Deploy to Netlify or Vercel:
- Drag and drop the `build` folder to [Netlify](https://netlify.com)
- Or connect GitHub repo to [Vercel](https://vercel.com)

### Option 2: Railway (Modern Alternative)
1. Connect your GitHub repo to [Railway](https://railway.app)
2. Deploy backend and frontend separately
3. Set environment variables

### Option 3: Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/todo-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
```

## 🔧 Environment Configuration

### Production Backend Settings
Update `application.properties` for production:
```properties
# Production settings
server.port=${PORT:8080}
jwt.secret=${JWT_SECRET:your-production-secret-key}
jwt.expiration=86400000

# CORS for production
spring.web.cors.allowed-origins=${FRONTEND_URL:http://localhost:3000}
```

### Frontend Environment Variables
Create `.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

Update API calls in frontend:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
```

## 📋 Pre-Deployment Checklist

- [ ] All sensitive data in environment variables
- [ ] CORS configured for production domains
- [ ] Frontend API URLs point to production backend
- [ ] Database configured (if switching from in-memory)
- [ ] Error handling for production
- [ ] Logging configured
- [ ] Security headers enabled
- [ ] HTTPS enabled

## 🔒 Security for Production

1. **Change JWT Secret**: Use a strong, random secret key
2. **Enable HTTPS**: Use SSL certificates
3. **Update CORS**: Only allow your frontend domain
4. **Add Rate Limiting**: Prevent API abuse
5. **Input Validation**: Validate all user inputs
6. **Error Handling**: Don't expose stack traces

## 📊 Monitoring

### Add Health Check Endpoint
```java
@RestController
public class HealthController {
    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("timestamp", LocalDateTime.now().toString());
        return status;
    }
}
```

### Frontend Error Boundary
```javascript
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
```

## 🎯 Performance Optimization

### Backend
- Enable gzip compression
- Add caching headers
- Optimize database queries (when using real DB)
- Use connection pooling

### Frontend
- Code splitting with React.lazy()
- Optimize images
- Enable service worker for caching
- Minimize bundle size

---

**Ready to deploy! 🚀**