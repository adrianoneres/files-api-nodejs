import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { FilesController } from '@modules/files/infra/http/controllers/FilesController';

const filesRouter = Router();
const upload = multer(uploadConfig.multer);
const filesController = new FilesController();

filesRouter.post('/', upload.single('file'), filesController.create);
filesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  filesController.show,
);
filesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  filesController.delete,
);

export { filesRouter };
