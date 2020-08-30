import { Request, Response } from 'express';

import Folder from '../database/interfaces/Folder';

import knex from '../database/connection';

class FoldersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { limit } = request.query as { limit: string };

    const folders: Folder[] = await knex('folders')
      .join('folders_users', 'folders.id', '=', 'folders_users.folder_id')
      .where('folders_users.user_id', request.user.id)
      .select('folders.*')
      .limit(parseInt(limit, 10) || 100);

    return response.status(200).json(folders);
  }

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
