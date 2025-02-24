import { Request, Response, NextFunction } from "express";
import { CreateAssignment } from "@/interfaces/assignment.interfaces";

import {
  createAssignmentService,
  getListAssignmentService,
} from "@/modules/assignment/assignment.service";
export const createAssignmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bodyRequest: CreateAssignment = req.body;
    const idUserLogin = req.context?.user_id;
    const response = await createAssignmentService(bodyRequest,idUserLogin);
    res.status(201).json({
      message: "Successfully create assignment",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getListAssignmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  
    const { subject } = req.query;
    const response = await getListAssignmentService(subject as string);
    res.status(200).json({
      message: "Successfully retrieve assignment",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
