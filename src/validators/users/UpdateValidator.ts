import { Request, Response, NextFunction, RequestHandler } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): RequestHandler => {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().messages({
        'any.required': `O campo 'nome' não pode estar vazio.`,
        'string.empty': `O campo 'nome' não pode estar vazio.`,
      }),
      email: Joi.string().email().required().messages({
        'any.required': `O campo 'e-mail' não pode estar vazio.`,
        'string.empty': `O campo 'e-mail' não pode estar vazio.`,
        'string.email': `Insira um e-mail válido.`,
      }),
    }),
  })(request, response, next);
};
