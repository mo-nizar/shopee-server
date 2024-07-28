import express, { Request, Response } from "express";
import HomeController from "../controllers/HomeController";

const router = express.Router();


// register routes
router.get("/", async function (req: Request, res: Response) {
  try {
    const data = await HomeController().index();
    res.status(200).json(data);
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

router.post("/home", async function (req: Request, res: Response) {

});

export default router;
