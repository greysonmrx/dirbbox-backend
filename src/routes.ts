import { Router } from 'express';

import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import FoldersController from './controllers/FoldersController';
import UploadsController from './controllers/UploadsController';
import StorageController from './controllers/StorageController';
import PasswordController from './controllers/PasswordController';

import ensureAuthenticated from './middleware/ensureAuthenticated';

const routes = Router();
const usersController = new UsersController();
const sessionsController = new SessionsController();
const foldersController = new FoldersController();
const uploadsController = new UploadsController();
const storageController = new StorageController();
const passwordControlller = new PasswordController();

// Users
routes.post('/users', usersController.store);

// Sessions
routes.post('/sessions', sessionsController.store);

routes.use(ensureAuthenticated);

// Users
routes.put('/users', usersController.update);

// Folders
routes.get('/folders', foldersController.index);
routes.post('/folders', foldersController.store);

// Uploads
routes.get('/uploads/:limit', uploadsController.show);
routes.get('/uploads', uploadsController.index);
routes.post('/uploads', uploadsController.store);

// Storage
routes.get('/storage', storageController.index);

// Password
routes.patch('/password', passwordControlller.update);

export default routes;
