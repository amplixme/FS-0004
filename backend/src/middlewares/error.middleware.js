import { error } from "../utils/response.js";

export function errorHandler(err, req, res, next) {
  console.error(err);

  //Manejo de errores de prisma
  if (err.code === "P2002") {
    return error(res, "El email ya existe", 409);
  }

  if (err.code === "P2025") {
    return error(res, "Registro no encontrado", 404);
  }

  return error(res, err.message || "Error interno del servidor", 500);
}
