import { Router } from 'express';

import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import FoldersController from './controllers/FoldersController';
import UploadsController from './controllers/UploadsController';

import ensureAuthenticated from './middleware/ensureAuthenticated';

const routes = Router();
const usersController = new UsersController();
const sessionsController = new SessionsController();
const foldersController = new FoldersController();
const uploadsController = new UploadsController();

// Users
routes.post('/users', usersController.store);

// Sessions
routes.post('/sessions', sessionsController.store);

routes.use(ensureAuthenticated);

// Folders
routes.get('/folders', foldersController.index);
routes.post('/folders', foldersController.store);

// Uploads
routes.post('/uploads', uploadsController.store);

export default routes;
