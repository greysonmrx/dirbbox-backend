import multer from 'multer';
import { Router } from 'express';

import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import FoldersController from './controllers/FoldersController';
import UploadsController from './controllers/UploadsController';
import StorageController from './controllers/StorageController';
import PasswordController from './controllers/PasswordController';

import UserStoreValidator from './validators/users/StoreValidator';
import UserUpdateValidator from './validators/users/UpdateValidator';
import UploadShowValidator from './validators/uploads/ShowValidator';
import UploadIndexValidator from './validators/uploads/IndexValidator';
import StorageUpdateValidator from './validators/storage/UpdateValidator';
import SessionStoreValidator from './validators/sessions/StoreValidator';
import PasswordUpdateValidator from './validators/passwords/UpdateValidator';

import ensureAuthenticated from './middleware/ensureAuthenticated';

import multerConfig from './config/multer';

const routes = Router();
const upload = multer(multerConfig);

const usersController = new UsersController();
const sessionsController = new SessionsController();
const foldersController = new FoldersController();
const uploadsController = new UploadsController();
const storageController = new StorageController();
const passwordControlller = new PasswordController();

// Users
routes.post('/users', UserStoreValidator, usersController.store);

// Sessions
routes.post('/sessions', SessionStoreValidator, sessionsController.store);

routes.use(ensureAuthenticated);

// Users
routes.put('/users', UserUpdateValidator, usersController.update);

// Folders
routes.get('/folders', foldersController.index);
routes.post('/folders', foldersController.store);

// Uploads
routes.get('/uploads/:limit', UploadShowValidator, uploadsController.show);
routes.get('/uploads', UploadIndexValidator, uploadsController.index);
routes.post('/uploads', upload.single('file'), uploadsController.store);

// Storage
routes.get('/storage', storageController.index);
routes.patch('/storage', StorageUpdateValidator, storageController.update);

// Password
routes.patch('/password', PasswordUpdateValidator, passwordControlller.update);

export default routes;
