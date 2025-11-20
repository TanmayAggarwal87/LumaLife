import { Router } from "express";

import { uploadHealthData } from "../controllers/healthController.js";

const router = Router();

router.post("/upload", uploadHealthData);

export default router;

