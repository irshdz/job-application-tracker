# JobTracker — Frontend

The frontend of **JobTracker**, a full-stack Job Application Tracker built with Next.js, React, Tailwind CSS and Axios.

## Live Demo

[Open JobTracker](https://frontend-blond-five-na5ywu9h7u.vercel.app/)

## Overview

JobTracker helps users manage and track their job applications from a single dashboard.

The frontend provides a responsive interface for authentication, application management, searching, filtering and viewing application statistics.

## Features

- User registration and login
- JWT-based authentication
- Protected dashboard
- Create job applications
- View job applications
- Edit job applications
- Delete job applications
- Search applications
- Filter applications by status
- Dashboard statistics
- Application status tracking
- Responsive dark-themed UI

## Tech Stack

- Next.js
- React
- JavaScript
- Tailwind CSS
- Axios

## Backend

The frontend communicates with a Spring Boot REST API.

```text
Next.js Frontend
       ↓
     Axios
       ↓
Spring Boot REST API
       ↓
   MongoDB Atlas
