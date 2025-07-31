# 🚀 NestJS Base Starter

This is a **NestJS base boilerplate** project built for learning and quickly bootstrapping backend applications with essential features like CRUD APIs, Google Authentication, and Event-Driven architecture using Listeners.

---

## 📚 Features Implemented

### ✅ CRUD REST APIs
- Built using NestJS Controllers and Services
- Follows RESTful standards
- Clean separation of concerns with DTOs, Services, and Repositories
- Ready-to-extend for any resource

### 🔐 Google Login Integration
- Google OAuth 2.0 login support using Passport.js
- Authenticated route protection with JWT strategy
- Easily replaceable with other social login providers

### 📢 Event & Listener System
- Custom event dispatching using NestJS `@EventEmitterModule`
- Decoupled business logic using Event Listeners
- Example use cases: send notification, trigger logging, etc.

---

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Authentication**: Passport + JWT + Google OAuth
- **Event Handling**: EventEmitter2
- **Validation**: class-validator + DTOs
- **Environment**: Configurable via `.env`

---

## 📦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/vishalsinhadev/nestjs-base.git
cd nestjs-base
