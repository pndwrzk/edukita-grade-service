import {
  CreateAssignment,
  Assignment,
  AssignmentResponse,
} from "@/interfaces/assignment.interfaces";
import { CustomError, DataValidator } from "@/utils/custom-error";
import { sendTelegramMessage } from "@/utils/telegram";
import { validateCreateAssignment } from "./assignment.validator";
import repo from "./assignment.repo";
import userRepo from "@/modules/auth/auth.repo";
import httpStatus from "http-status";
export const createAssignmentService = async (
  body: CreateAssignment,
  idUserLogin: number | undefined
): Promise<Assignment> => {
  if (!idUserLogin) {
    throw new CustomError("user not found", httpStatus.NOT_FOUND);
  }
  const user = await userRepo.findUserById(idUserLogin);
  if (!user) {
    throw new CustomError("user not found", httpStatus.NOT_FOUND);
  }

  body.user_id = user.id;
  const { error } = validateCreateAssignment(body);
  if (error) {
    const dataError = DataValidator(error);
    throw new CustomError(
      "request body is invalid",
      httpStatus.BAD_REQUEST,
      dataError
    );
  }

 

  const assignmentData = await repo.createAssignment(body);

  const messageBody = {
    student : user.name,
    title:  assignmentData.title,
    subject : assignmentData.subject,
    created_at : assignmentData.created_at
  }
   sendTelegramMessage(messageBody);
  return assignmentData;
};

export const getListAssignmentService = async (
  subjectParam: string
): Promise<AssignmentResponse[]> => {
  const response = await repo.getListAssignment(subjectParam);
  return response;
};
