import Joi from 'joi';
import { CreateAssignment } from '@/interfaces/assignment.interfaces';





export const validateCreateAssignment = (body: CreateAssignment) => {
    const schema = Joi.object({
        subject: Joi.string()
          .max(100)
          .required()
          .messages({
            'string.base': 'Subject must be a string.',
            'string.max': 'Subject cannot exceed 100 characters.',
            'any.required': 'Subject is required.'
          }),
      
        title: Joi.string()
          .max(100)
          .required()
          .messages({
            'string.base': 'Title must be a string.',
            'string.max': 'Title cannot exceed 100 characters.',
            'any.required': 'Title is required.'
          }),
      
        content: Joi.string()
          .required()
          .messages({
            'string.base': 'Content must be a string.',
            'any.required': 'Content is required.'
          }),
      
          user_id: Joi.number()
          .integer()
          .positive()
          .required()
          .messages({
            'number.base': 'User ID must be a number.',
            'number.integer': 'User ID must be an integer.',
            'number.positive': 'User ID must be a positive number.',
            'any.required': 'User ID is required.'
          })
      });

    return schema.validate(body, { abortEarly: false, stripUnknown: true });
};
