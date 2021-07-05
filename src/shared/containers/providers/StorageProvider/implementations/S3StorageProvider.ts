import fs from 'fs';
import { resolve } from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3();
  }

  public async saveFile(nome: string): Promise<string> {
    const tmpUrl = resolve(uploadConfig.tmpFolder, nome);

    const ContentType = mime.getType(tmpUrl);

    if (!ContentType) {
      throw new AppError('Arquivo não encontrado');
    }

    const fileContent = await fs.promises.readFile(tmpUrl);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: nome,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        ContentDisposition: `inline; filename=${nome}`,
      })
      .promise();

    await fs.promises.unlink(tmpUrl);

    const fileUrl = `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${nome}`;

    return fileUrl;
  }

  public async deleteFile(name: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: name,
      })
      .promise();
  }
}

export { S3StorageProvider };
