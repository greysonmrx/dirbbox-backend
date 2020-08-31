import { Request, Response, NextFunction, RequestHandler } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): RequestHandler => {
  return celebrate({
    [Segments.QUERY]: Joi.object().keys({
      folder_id: Joi.number().required().messages({
        'any.required': `O campo 'pasta' não pode estar vazio.`,
        'number.base': `O campo 'pasta' precisa ser um número.`,
      }),
    }),
  })(request, response, next);
};
