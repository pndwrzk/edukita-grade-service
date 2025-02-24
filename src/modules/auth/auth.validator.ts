import Joi from 'joi';
import { CreateUser,LoginUser, RefreshToken } from '@/interfaces/user.interfaces';





export const validateSignUp = (userData: CreateUser) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Email format is invalid.',
            'any.required': 'Email is required.',
        }),
        name: Joi.string().min(1).required().messages({
            'string.min': 'Name should have at least 1 character.',
            'any.required': 'Name is required.',
        }),
        username: Joi.string().optional().messages({
            'string.base': 'Username must be a string.',
        }),
        role: Joi.string()
            .valid('teacher', 'student')
            .required()
            .messages({
                'any.only': 'Role must be either teacher or student.',
                'any.required': 'Role is required.',
            }),
        password: Joi.string()
            .min(3)
            .required()
            .messages({
                'string.min': 'Password must have at least 3 characters.',
                'any.required': 'Password is required.',
            }),
    });

    return schema.validate(userData, { abortEarly: false, stripUnknown: true });
};

export const validateSignIn= (loginData: LoginUser) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Email format is invalid.',
            'any.required': 'Email is required.',
        }),
        password: Joi.string()
            .required()
            .messages({
                'any.required': 'Password is required.',
            }),
    });

    return schema.validate(loginData, { abortEarly: false, stripUnknown: true });
};


export const validateRefreshToken= (refreshTokenData: RefreshToken) => {
    const schema = Joi.object({
        refresh_token: Joi.string()
            .required()
            .messages({
                'any.required': 'refresh token is required.',
            }),
    });

    return schema.validate(refreshTokenData, { abortEarly: false, stripUnknown: true });
};