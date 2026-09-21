# Job Application Tracker

A full-stack web application for managing and tracking job applications in one place.

## Live Demo

[Open JobTracker](https://frontend-blond-five-na5ywu9h7u.vercel.app/)

## GitHub Repository

[View Source Code](https://github.com/irshdz/job-application-tracker)

## Overview

Job Application Tracker helps users organize their job search by storing job applications, tracking application status, searching and filtering applications, and viewing application statistics from a dashboard.

The application provides secure user authentication and ensures that each user can access only their own job application data.

## Features

- User registration and login
- JWT-based authentication
- BCrypt password hashing
- Protected REST APIs
- User-specific application access
- Create job applications
- View job applications
- Update applications
- Delete applications
- Search by company or position
- Filter applications by status
- Dashboard statistics
- Application status tracking
- Job type tracking
- Salary information
- Job URL storage
- Notes for each application
- Request validation
- Centralized exception handling
- CORS configuration
- Responsive dark-themed frontend

## Tech Stack

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data MongoDB
- Maven

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- Axios

### Database

- MongoDB Atlas

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## Architecture

```text
                    User
                      |
                      v
              Vercel / Next.js
                Frontend
                      |
                    Axios
                      |
                      v
              Render / Spring Boot
                  REST API
                      |
              Spring Security
                      |
                  JWT Filter
                      |
                      v
                 Controller
                      |
                      v
                   Service
                      |
                      v
                 Repository
                      |
                      v
                MongoDB Atlas
Authentication Flow
User
 |
 | Email + Password
 v
POST /api/auth/login
 |
 v
AuthController
 |
 v
AuthService
 |
 v
UserRepository
 |
 v
BCrypt Password Verification
 |
 +----------------------+
 |                      |
Valid                 Invalid
 |                      |
 v                      v
Generate JWT       Authentication Error
 |
 v
Frontend stores JWT
 |
 v
Authorization: Bearer <JWT>
 |
 v
JwtAuthenticationFilter
 |
 v
Validate JWT
 |
 v
Protected REST API
API Endpoints
Method
Endpoint
Description
POST
/api/auth/register
Register a new user
POST
/api/auth/login
Authenticate user
GET
/api/applications
Get user's applications
POST
/api/applications
Create application
GET
/api/applications/{id}
Get application
PUT
/api/applications/{id}
Update application
DELETE
/api/applications/{id}
Delete application
GET
/api/dashboard
Get dashboard statistics
Application Status
The application supports the following statuses:
Applied
Screening
Interview
Offer
Rejected
Job Types
Full Time
Part Time
Contract
Internship
Security
The application implements several security measures:
JWT-based authentication
BCrypt password hashing
Stateless authentication
Protected REST endpoints
User ownership validation
User data isolation
Request validation
CORS configuration
Environment variables for sensitive configuration
User Data Isolation
Each job application is associated with the authenticated user's identity.
Users can only access, update and delete their own applications.
The application does not rely on a user-provided ID from the frontend for authorization. The authenticated identity is used to control access to application data.
Dashboard
The dashboard provides statistics for:
Total Applications
Applied
Screening
Interviews
Offers
Rejected
Users can also search and filter their applications directly from the dashboard.
Screenshots
Project screenshots are available in the screenshots directory.
The screenshots include application authentication and dashboard interfaces.
Project Structure
job-application-tracker/
│
├── .mvn/
│   └── wrapper/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── README.md
│
├── screenshots/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/jobtracker/
│       │       ├── config/
│       │       ├── controller/
│       │       ├── dto/
│       │       ├── exception/
│       │       ├── model/
│       │       ├── repository/
│       │       ├── security/
│       │       └── service/
│       │
│       └── resources/
│           └── application.properties
│
├── Dockerfile
├── pom.xml
├── mvnw
├── mvnw.cmd
├── .gitignore
└── README.md
Local Development
Backend
Requirements:
Java 17
Maven
MongoDB
Set the required environment variables before starting the backend:
MONGODB_URI=mongodb://localhost:27017/job_tracker
MONGODB_DATABASE=job_tracker
JOBTRACKER_JWT_SECRET=<your-secret>
Run the Spring Boot application:
./mvnw spring-boot:run
On Windows:
.\mvnw.cmd spring-boot:run
The backend runs on:
http://localhost:8080
Frontend
Go to the frontend directory:
cd frontend
Install dependencies:
npm install
Create a local .env.local file:
NEXT_PUBLIC_API_URL=http://localhost:8080
Start the development server:
npm run dev
Open:
http://localhost:3000
Environment Variables
Backend
MONGODB_URI
MONGODB_DATABASE
JOBTRACKER_JWT_SECRET
Frontend
NEXT_PUBLIC_API_URL
Do not commit secrets or .env.local files to the repository.
Deployment
The application is deployed using the following architecture:
User
  |
  v
Vercel
Next.js Frontend
  |
  v
Render
Spring Boot Backend
  |
  v
MongoDB Atlas
Database
Production Services
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
Future Improvements
Possible future improvements include:
Application details page
Pagination
Advanced dashboard charts
User profile management
Email notifications
Job deadline reminders
Improved loading and error states
Custom domain
Additional analytics
Author
Irshad
Java Full Stack Developer
Built as a full-stack Java + Next.js portfolio project.
