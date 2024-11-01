import { Router } from "express";
import panel from "#controller/socket";

const router = Router();

router.post("/api/socket", panel.SEND);

export default router;