import express from "express";
import { getHistory, saveLocation } from "../controllers/location.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login");
});
    
// save each coord with timestamp
router.post("/", saveLocation);


// /api/location/history/:agentId
router.get("/history/:agentId",
  //  authMiddleware,
    getHistory); // jwt -> authMiddleware

export default router;