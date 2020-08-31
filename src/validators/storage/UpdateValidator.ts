import { Request, Response, NextFunction, RequestHandler } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): RequestHandler => {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      storage: Joi.number().required().messages({
        'any.required': `O campo 'armazenamento' não pode estar vazio.`,
        'number.base': `O campo 'armazenamento' precisa ser um número.`,
      }),
    }),
  })(request, response, next);
};
