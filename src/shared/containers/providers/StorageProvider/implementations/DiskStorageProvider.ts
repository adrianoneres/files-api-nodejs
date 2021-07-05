import fs from 'fs';
import { resolve } from 'path';

import uploadConfig from '@config/upload';
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(name: string): Promise<string> {
    const tmpUrl = resolve(uploadConfig.tmpFolder, name);
    const uploadsUrl = resolve(uploadConfig.uploadsFolder, name);

    await fs.promises.rename(tmpUrl, uploadsUrl);

    return uploadsUrl;
  }

  public async deleteFile(name: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadsFolder, name);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export { DiskStorageProvider };
