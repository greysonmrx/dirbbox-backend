import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../database/interfaces/User';

import knex from '../database/connection';

import authConfig from '../config/auth';

class SessionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user: User = await knex('users').where('email', email).first();

    if (!user) {
      return response.status(404).json({
        message: 'Usuário não encontrado.',
      });
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      return response.status(401).json({
        message: 'Senha incorreta.',
      });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.status(201).json({
      token,
      user,
    });
  }
}

export default SessionsController;
