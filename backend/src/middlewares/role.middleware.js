export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        error: { message: "No autorizado" }
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: { message: "No tienes permisos para realizar esta acción" }
      });
    }

    next();
  };
};