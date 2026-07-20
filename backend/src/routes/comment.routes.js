import { Router } from "express";
import {
  addComment,
  getComments
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/:postId/comments",
  authMiddleware,
  addComment
);

router.get(
  "/:postId/comments",
  getComments
);

export default router;