import express from "express";
import {
  authenticateCompanyController,
  getAllTrains,
  registerController,
} from "../controllers/trainController.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/auth", authenticateCompanyController);
router.get("/trains", getAllTrains);
export default router;
