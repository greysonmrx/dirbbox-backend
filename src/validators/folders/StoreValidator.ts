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
      color: Joi.string().required().messages({
        'any.required': `O campo 'cor' não pode estar vazio.`,
        'string.empty': `O campo 'cor' não pode estar vazio.`,
      }),
    }),
  })(request, response, next);
};
