import { container } from 'tsyringe';

import './providers';

import { IFilesRepository } from '@modules/files/repositories/IFilesRepository';
import { FilesRepository } from '@modules/files/infra/typeorm/repositories/FilesRepository';

container.registerSingleton<IFilesRepository>(
  'FilesRepository',
  FilesRepository,
);
