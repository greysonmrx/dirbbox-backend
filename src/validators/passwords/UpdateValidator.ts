import { Request, Response, NextFunction, RequestHandler } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): RequestHandler => {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      currentPassword: Joi.string().min(6).required().messages({
        'any.required': `O campo 'senha atual' não pode estar vazio.`,
        'string.empty': `O campo 'senha atual' não pode estar vazio.`,
        'string.min': `O campo 'senha atual' tem que ter pelo menos {#limit} dígitos.`,
      }),
      newPassword: Joi.string().min(6).required().messages({
        'any.required': `O campo 'nova senha' não pode estar vazio.`,
        'string.empty': `O campo 'nova senha' não pode estar vazio.`,
        'string.min': `O campo 'nova senha' tem que ter pelo menos {#limit} dígitos.`,
      }),
    }),
  })(request, response, next);
};
