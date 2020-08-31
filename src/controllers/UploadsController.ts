import { Request, Response } from 'express';

import Upload from '../database/interfaces/Upload';

import knex from '../database/connection';

class UploadsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { limit } = request.params as { limit: string };

    const uploads: Upload[] = await knex('uploads')
      .join('folders_uploads', 'uploads.id', '=', 'folders_uploads.upload_id')
      .where('folders_uploads.user_id', request.user.id)
      .select('uploads.*')
      .limit(parseInt(limit, 10));

    return response.status(200).json(uploads);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { folder_id } = request.query as { folder_id: string };

    const uploads: Upload[] = await knex('uploads')
      .join('folders_uploads', 'uploads.id', '=', 'folders_uploads.upload_id')
      .where('folders_uploads.user_id', request.user.id)
      .where('folders_uploads.folder_id', folder_id)
      .select('uploads.*');

    return response.status(200).json(uploads);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { folder_id } = request.body;
    const { originalname: name, size } = request.file;

    const folder = await knex('folders').where('id', folder_id).first();

    if (!folder) {
      return response.status(404).json({
        message: 'Pasta não encontrada.',
      });
    }

    const trx = await knex.transaction();

    const type = name.split('.')[1];

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const uploadExists = await knex('uploads').where('id', id).first();

    if (!uploadExists) {
      return response.status(404).json({
        message: 'Arquivo não encontrado.',
      });
    }

    await knex('uploads').where('id', id).update({ name });

    const upload = await knex('uploads').where('id', id).first();

    return response.status(200).json(upload);
  }
}

export default UploadsController;
