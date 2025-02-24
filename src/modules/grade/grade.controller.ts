import { Request, Response, NextFunction } from "express";
import { CreateGrade } from "@/interfaces/grade.interfaces";
import {
  createGradeService,
  getGradeService
} from "@/modules/grade/grade.service"

export const createGradeController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bodyRequest: CreateGrade = req.body;
    const idUserLogin = req.context?.user_id;
    const response = await createGradeService(bodyRequest,idUserLogin);
    res.status(201).json({
      message: "Successfully create grade",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getListGradeController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const idUserLogin = req.context?.user_id;
    const response = await getGradeService(idUserLogin);
    res.status(200).json({
      message: "Successfully retrieve grade",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};


