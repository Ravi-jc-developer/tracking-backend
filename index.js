import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import locationRoutes from "./routes/location.routes.js";
import userRoutes from './routes/user.routes.js';

// load env variables
dotenv.config();

// connect to db
ConnectDB();

const port = process.env.PORT || 3000;

// server instance
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// req logs
app.use((req, res, next) => {
    console.log("request: ", req?.body);
    next();
})

// routes
app.use("/api/auth", authRoutes);
app.use("/api/location", locationRoutes);
app.use('/api/user', userRoutes);

// app.post("/test", (req, res)=> {
//   console.log(req.body);
//   res.json({
//     success: true
//   })
// })

// res logs
app.use((req, res, next) => {
  console.log("response: ", res);
  next();
})

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server Running",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});