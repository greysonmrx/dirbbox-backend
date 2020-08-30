import { Request, Response } from 'express';

import User from '../database/interfaces/User';

import {
  getProgrammingTypes,
  getImageTypes,
  getVideoTypes,
  getDocumentTypes,
} from '../utils/getUploadTypes';

import knex from '../database/connection';

class StorageController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user: User = await knex('users').where('id', request.user.id).first();

    const programmingUploads = (await knex('uploads')
      .join('folders_uploads', 'uploads.id', '=', 'folders_uploads.upload_id')
      .where('folders_uploads.user_id', request.user.id)
      .whereIn('uploads.type', getProgrammingTypes())
      .sum('uploads.size')
      .first()) as Record<string, number | null>;

    const imageUploads = (await knex('uploads')
      .join('folders_uploads', 'uploads.id', '=', 'folders_uploads.upload_id')
      .where('folders_uploads.user_id', request.user.id)
      .whereIn('uploads.type', getImageTypes())
      .sum('uploads.size')
      .first()) as Record<string, number | null>;

    const videoUploads = (await knex('uploads')
      .join('folders_uploads', 'uploads.id', '=', 'folders_uploads.upload_id')
      .where('folders_uploads.user_id', request.user.id)
      .whereIn('uploads.type', getVideoTypes())
      .sum('uploads.size')
      .first()) as Record<string, number | null>;

    const documentUploads = (await knex('uploads')
      .join('folders_uploads', 'uploads.id', '=', 'folders_uploads.upload_id')
      .where('folders_uploads.user_id', request.user.id)
      .whereIn('uploads.type', getDocumentTypes())
      .sum('uploads.size')
      .first()) as Record<string, number | null>;

    const otherUploads = (await knex('uploads')
      .join('folders_uploads', 'uploads.id', '=', 'folders_uploads.upload_id')
      .where('folders_uploads.user_id', request.user.id)
      .whereNotIn('uploads.type', getProgrammingTypes())
      .whereNotIn('uploads.type', getImageTypes())
      .whereNotIn('uploads.type', getVideoTypes())
      .whereNotIn('uploads.type', getDocumentTypes())
      .sum('uploads.size')
      .first()) as Record<string, number | null>;

    const data = [
      Object.values(programmingUploads)[0] || 0,
      Object.values(imageUploads)[0] || 0,
      Object.values(videoUploads)[0] || 0,
      Object.values(documentUploads)[0] || 0,
      Object.values(otherUploads)[0] || 0,
    ];

    let total = 0;

    data.forEach(item => {
      total += item;
    });

    return response.status(200).json({
      data,
      remaining: user.storage - total,
      total,
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { storage } = request.body;

    const userId: number = await knex('users')
      .where('id', request.user.id)
      .update({ storage });

    const user: User = await knex('users').where('id', userId).first();

    return response.status(200).json(user);
  }
}

export default StorageController;
