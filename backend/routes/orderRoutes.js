// routes/orderRoutes.js
import express from "express";
import {
  placeOrder,
  getUserOrders,
  getAllOrders
} from "../controllers/orderContoller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getUserOrders);
router.get("/", protect, getAllOrders);

export default router;
