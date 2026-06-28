import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";
import { register, login } from "../controllers/auth.controller.js";
import { loginSchema } from "../schemas/auth.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);


//Futura ruta//
router.get("/admin-test", authMiddleware, requireRole("ADMIN"), (req, res) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user,
  });
});

export default router;
