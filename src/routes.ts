import { Router } from 'express';

import UsersController from './controllers/UsersController';

const routes = Router();
const usersController = new UsersController();

routes.post('/users', usersController.store);

export default routes;
