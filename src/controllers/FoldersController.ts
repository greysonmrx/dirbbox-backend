import { Request, Response } from 'express';

import knex from '../database/connection';

class FoldersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, color } = request.body;

    const folderExistsWithName = await knex('folders')
      .where('name', name)
      .first();

    if (folderExistsWithName) {
      return response.status(400).json({
        message: 'Esta pasta já existe.',
      });
    }

    const trx = await knex.transaction();

    const insertedIds = await trx('folders').insert({
      name,
      color,
    });

    const folderId = insertedIds[0];

    await trx('folders_users').insert({
      folder_id: folderId,
      user_id: request.user.id,
    });

    await trx.commit();

    return response.status(201).json({ success: true });
  }
}

export default FoldersController;
