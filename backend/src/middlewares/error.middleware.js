import { error } from "../utils/response.js";

export function errorHandler(err, req, res, next) {
  console.error(err);

  //Manejo de errores de prisma
  if (err.code === "P2002") {
    return error(res, "The email address already exists", 409);
  }

  if (err.code === "P2025") {
    return error(res, "Record not found", 404);
  }

  return error(res, err.message || "Internal server error", 500);
}
