import { CustomError } from "@/utils/custom-error";
import { Request, Response, NextFunction } from "express";
export const roleValidate = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req.context;
    if (!data) {
      throw new CustomError("Access forbidden. Insufficient permissions", 403);
    }
    if (!roles.includes(data.user_role)) {
      throw new CustomError("Access forbidden. Insufficient permissions", 403);
    }

    next();
  };
};
