import express, { Request, Response } from "express";
import productModel from "../models/products.model.js";
import UserController from '../controllers/UserController';

const router = express.Router();


// register routes
router.post("/register", async function (req: Request, res: Response) {
  try {
    const data = await UserController().signup(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

router.post("/login", async function (req: Request, res: Response) {
  try {
    const data = await UserController().login(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

export default router;
