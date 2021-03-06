import { Router } from "express";
import recordRouter from "./records";
import analysisRouter from "./analysis";

const router = Router();

router.use("/records", recordRouter);
router.use("/analysis", analysisRouter);

export default router;
