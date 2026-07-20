import { Router } from "express";
import {
  update,
  remove
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.put(
  "/:id",
  authMiddleware,
  update
);

router.delete(
  "/:id",
  authMiddleware,
  remove
);



export default router;