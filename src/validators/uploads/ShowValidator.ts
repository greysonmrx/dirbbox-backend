import { Request, Response, NextFunction, RequestHandler } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): RequestHandler => {
  return celebrate({
    [Segments.QUERY]: Joi.object().keys({
      limit: Joi.number().required().messages({
        'any.required': `O campo 'limite' não pode estar vazio.`,
        'number.base': `O campo 'limite' precisa ser um número.`,
      }),
    }),
  })(request, response, next);
};
