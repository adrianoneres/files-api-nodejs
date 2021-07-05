import { injectable, inject } from 'tsyringe';

import { File } from '@modules/files/infra/typeorm/entities/File';
import { IFilesRepository } from '@modules/files/repositories/IFilesRepository';
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  name: string;
}

@injectable()
class CreateFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<File> {
    const url = await this.storageProvider.saveFile(name);

    const file = await this.filesRepository.create({
      name,
      url,
    });

    return file;
  }
}

export { CreateFileService };
