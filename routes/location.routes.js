import express from "express";
import { createTrekSession, getHistory, getTreks, saveLocation, updateTrekSession } from "../controllers/location.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { trekSessionSchema } from "../schema/location.schema.js";

const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login");
});

// save each coord with timestamp
// /api/location/
router.post("/", saveLocation);

// /api/location/history/:agentId
router.get("/history/:agentId",
  authMiddleware,
  getHistory);

router.post("/trek",
  // validate(trekSessionSchema),
  //  authMiddleware,
  createTrekSession
)

router.patch("/trek/:trekId",
  // validate(trekSessionSchema),
  // authMiddleware,
  updateTrekSession
)

// get tracks of an agent
router.get("/treks/:agentId",
  // authMiddleware,
  getTreks
)

export default router;