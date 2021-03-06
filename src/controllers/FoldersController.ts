import { Request, Response } from 'express';

import Folder from '../database/interfaces/Folder';

import knex from '../database/connection';

class FoldersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { limit, search } = request.query as {
      limit: string;
      search: string;
    };

    const folders: Folder[] = await knex('folders')
      .join('folders_users', 'folders.id', '=', 'folders_users.folder_id')
      .where('folders_users.user_id', request.user.id)
      .where('folders.name', 'like', `${search || ''}%`)
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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, color } = request.body;

    const folderExists = await knex('folders').where('id', id).first();

    if (!folderExists) {
      return response.status(404).json({
        message: 'Pasta não encontrada.',
      });
    }

    const folderExistsWithName: Folder = await knex('folders')
      .where('name', name)
      .first();

    if (folderExistsWithName && String(folderExistsWithName.id) !== id) {
      return response.status(400).json({
        message: 'Esta pasta já existe.',
      });
    }

    await knex('folders').where('id', id).update({
      name,
      color,
    });

    const folder = await knex('folders').where('id', id).first();

    return response.status(200).json(folder);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const folderExists = await knex('folders').where('id', id).first();

    if (!folderExists) {
      return response.status(404).json({
        message: 'Pasta não encontrada.',
      });
    }

    await knex('folders').where('id', id).del();

    return response.status(204).json();
  }
}

export default FoldersController;
