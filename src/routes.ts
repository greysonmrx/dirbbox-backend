import { Router } from 'express';

import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

import ensureAuthenticated from './middleware/ensureAuthenticated';

const routes = Router();
const usersController = new UsersController();
const sessionsController = new SessionsController();

// Users
routes.post('/users', usersController.store);

// Sessions
routes.post('/sessions', sessionsController.store);

routes.use(ensureAuthenticated);

export default routes;
