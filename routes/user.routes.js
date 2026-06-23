import express from "express";

const router = express.Router();

router.post("/user", (req, res) => {
  res.send("user");
});

export default router;