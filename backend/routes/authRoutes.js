import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Dashboard data ✅",
    user: req.user,
  });
});

export default router;
