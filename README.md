
# 🧠 Topper Server - Real Money Quiz App Backend

> Powering the backend for the **Topper Quiz App**, a real-money trivia platform. Built for performance, scalability, and seamless integration with real-time and payment services.

---

## 📁 Project Structure

```

topper-server/
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── controllers/     # All route handlers (users, wallet, etc.)
│   │       ├── models/          # Mongoose models (User, Wallet)
│   │       ├── routes/          # Express route files
│   │       ├── services/        # Business logic
│   ├── config/                  # DB, ENV configs
│   ├── utils/                   # Reusable helpers (error, logger, response)
│   ├── swagger/                 # Swagger API docs setup
├── uploads/                     # Uploaded user images
├── app.ts                       # Main Express app file
├── server.ts                    # Server bootstrap
├── package.json

````

---

## 🚀 Tech Stack

**Backend:**

- Node.js, Express.js, TypeScript
- MongoDB with Mongoose
- Multer (File Uploads)
- Swagger (API Docs)
- RESTful API Architecture

**DevOps & Infra:**

- Docker-ready
- NGINX, PM2 compatible
- CI/CD friendly (GitHub Actions)
- Swagger UI: [`/api-docs`](http://localhost:PORT/api-docs)

---

## ⚙️ Features

- ✅ **User Authentication** (Mobile-based login)
- 📸 **Avatar Upload** via `Multer`
- 💼 **Wallet System**  
  - Bonus Wallet  
  - Deposit Wallet  
  - Winning Wallet  
- 🛡️ **Error Handling** with custom error utility
- 📘 **Swagger Documentation**: Fully annotated routes
- ⚙️ Modular & Scalable Codebase

---

## 📦 Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/deepak748030/topper-server.git
cd topper-server

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# ➤ Fill out Mongo URI, PORT, etc. in `.env`

# 4. Start the server
npm run dev     # For development (ts-node-dev)
npm run build   # Compile to JavaScript
npm start       # Run compiled app
````

---

## 🔑 Environment Variables

Create a `.env` file with the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/topper
```

---

## 📚 API Documentation

* Swagger UI available at: [`http://localhost:PORT/api-docs`](http://localhost:PORT/api-docs)
* Fully documented using JSDoc-style comments and OpenAPI spec

---

## 🧠 Creator: Deepak Kushwah

> 💻 Full Stack Developer | MERN & React Native Specialist
> 🔥 Passionate about Microservices, Kafka, WebSockets & Real-time Systems

### 🌐 About Me

* 👨‍🎓 B.Tech in CSE | Prestige Institute of Technology, Bhopal
* 🛠️ Expert in MERN Stack, Kafka, Redis, Razorpay, React Native
* 📦 Built scalable apps with Docker, NGINX, Kubernetes
* 🔐 Worked on Secure Wallets, UPI, Real-money apps

📎 **GitHub**: [github.com/deepak748030](https://github.com/deepak748030)
📎 **Project Repo**: [topper-server](https://github.com/deepak748030/topper-server)

---

## 🤝 Contributing

```bash
# Fork and clone the repo
git clone https://github.com/your-username/topper-server.git

# Make your changes and commit
git commit -m "Add your message here"

# Push and open PR
```

---

## 📄 License

This project is licensed under the **MIT License**.
