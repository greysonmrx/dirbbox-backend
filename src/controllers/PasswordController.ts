import { Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';

import User from '../database/interfaces/User';

import knex from '../database/connection';

class PasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { currentPassword, newPassword } = request.body;

    const user: User = await knex('users').where('id', request.user.id).first();

    const matchedPassword = await compare(currentPassword, user.password);

    if (!matchedPassword) {
      return response.status(401).json({
        message: 'Senha incorreta.',
      });
    }

    const password = await hash(newPassword, 8);

    await knex('users').where('id', request.user.id).update({
      password,
    });

    return response.status(204).json();
  }
}

export default PasswordController;
