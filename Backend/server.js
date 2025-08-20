

// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import userRouter from "./routes/userRouter.js";
// import cookieParser from "cookie-parser"; // Needed to read cookies
// import "dotenv/config";

// // App config
// const app = express();
// const port = process.env.PORT || 4000;

// // ✅ Middleware
// app.use(cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Routes
// app.use("/api/user", userRouter);

// // ✅ DB Connection
// connectDB();

// // ✅ Default route
// app.get("/", (req, res) => {
//     res.send("API working");
// });

// // ✅ Start server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://unlockedu.netlify.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy: origin ${origin} not allowed`));
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
