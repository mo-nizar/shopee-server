import express, { Request, Response } from "express";
import UserController from '../controllers/UserController';
import OrdersController from "../controllers/OrderController.js";

const router = express.Router();


// register routes
router.post("/view", async function (req: Request, res: Response) {
  try {
    const data = await OrdersController().fetchAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

router.post("/create", async function (req: Request, res: Response) {
  try {
    const data = await OrdersController().fetchAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

router.post("/update", async function (req: Request, res: Response) {
  try {
    const data = await OrdersController().fetchAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

export default router;
