import { Request, Response } from 'express';

import knex from '../database/connection';

class UploadsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, folder_id, type, size } = request.body;

    const folder = await knex('folders').where('id', folder_id).first();

    if (!folder) {
      return response.status(404).json({
        message: 'Pasta não encontrada.',
      });
    }

    const trx = await knex.transaction();

    const insertedIds = await trx('uploads').insert({
      name,
      type,
      size,
      url: '',
    });

    const uploadId = insertedIds[0];

    await trx('folders_uploads').insert({
      upload_id: uploadId,
      user_id: request.user.id,
      folder_id,
    });

    await trx.commit();

    return response.status(201).json({ success: true });
  }
}

export default UploadsController;
