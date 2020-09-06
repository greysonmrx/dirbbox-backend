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
import UploadIndexValidator from './validators/uploads/IndexValidator';
import UploadUpdateValidator from './validators/uploads/UpdateValidator';
import StorageUpdateValidator from './validators/storage/UpdateValidator';
import SessionStoreValidator from './validators/sessions/StoreValidator';
import PasswordUpdateValidator from './validators/passwords/UpdateValidator';
import FolderStoreValidator from './validators/folders/StoreValidator';
import FolderUpdateValidator from './validators/folders/UpdateValidator';

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
routes.post('/folders', FolderStoreValidator, foldersController.store);
routes.put('/folders/:id', FolderUpdateValidator, foldersController.update);
routes.delete('/folders/:id', foldersController.destroy);

// Uploads
routes.get('/uploads/:limit', uploadsController.show);
routes.get('/uploads', UploadIndexValidator, uploadsController.index);
routes.post('/uploads', upload.single('file'), uploadsController.store);
routes.patch('/uploads/:id', UploadUpdateValidator, uploadsController.update);
routes.delete('/uploads/:id', uploadsController.destroy);

// Storage
routes.get('/storage', storageController.index);
routes.patch('/storage', StorageUpdateValidator, storageController.update);

// Password
routes.patch('/password', PasswordUpdateValidator, passwordControlller.update);

export default routes;
