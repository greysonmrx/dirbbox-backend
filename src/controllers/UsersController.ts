import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

import knex from '../database/connection';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password, storage } = request.body;

    const userExistsWithEmail = await knex('users')
      .where('email', email)
      .first();

    if (userExistsWithEmail) {
      return response.status(400).json({
        message: 'Este e-mail já está em uso. Tente outro.',
      });
    }

    const passwordHash = await hash(password, 8);

    await knex('users').insert({
      name,
      email,
      password: passwordHash,
      storage,
    });

    return response.status(201).json({ success: true });
  }
}

export default UsersController;
