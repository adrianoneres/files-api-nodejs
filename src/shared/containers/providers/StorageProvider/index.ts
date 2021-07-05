import { container } from 'tsyringe';

import uploadConfig from '@config/upload';
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider';
import { DiskStorageProvider } from '@shared/containers/providers/StorageProvider/implementations/DiskStorageProvider';
import { S3StorageProvider } from '@shared/containers/providers/StorageProvider/implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
