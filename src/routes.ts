import { Router } from 'express';
import OrphanageController from './controllers/OrphanagesController';

import multer from 'multer';
import uploadConfig from './config/upload';

const upload = multer(uploadConfig);

const routes = Router();

routes.post('/orphanages', upload.array('images'), OrphanageController.create)
routes.get('/orphanages', OrphanageController.index)
routes.get('/orphanages/:id', OrphanageController.show)

export default routes;