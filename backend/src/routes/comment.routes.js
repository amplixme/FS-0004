import { Router } from "express";
import { addComment } from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/:postId/comments",
  authMiddleware,
  addComment
);

export default router;