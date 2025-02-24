import Joi from 'joi';
import { CreateGrade } from '@/interfaces/grade.interfaces';

export const validateCreateGrade = (body: CreateGrade) => {
    const schema = Joi.object({
        user_id: Joi.number()
          .integer()
          .positive()
          .required()
          .messages({
            'number.base': 'User ID must be a number.',
            'number.integer': 'User ID must be an integer.',
            'number.positive': 'User ID must be a positive number.',
            'any.required': 'User ID is required.'
          }),

        assignment_id: Joi.number()
          .integer()
          .positive()
          .required()
          .messages({
            'number.base': 'Assignment ID must be a number.',
            'number.integer': 'Assignment ID must be an integer.',
            'number.positive': 'Assignment ID must be a positive number.',
            'any.required': 'Assignment ID is required.'
          }),

        feedback: Joi.string()
          .required()
          .messages({
            'string.base': 'Feedback must be a string.',
            'any.required': 'Feedback is required.'
          }),

        grade: Joi.number()
          .integer()
          .min(0)
          .max(100)
          .required()
          .messages({
            'number.base': 'Grade must be a number.',
            'number.integer': 'Grade must be an integer.',
            'number.min': 'Grade must be at least 0.',
            'number.max': 'Grade cannot exceed 100.',
            'any.required': 'Grade is required.'
          })
    });

   return  schema.validate(body, { abortEarly: false, stripUnknown: true });
};
