import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IFilesRepository } from '@modules/files/repositories/IFilesRepository';
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  id: string;
}

@injectable()
class DeleteFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const file = await this.filesRepository.findById(id);

    if (!file) {
      throw new AppError(
        'Nenhum arquivo encontrado com o identificador informado',
      );
    }

    await this.storageProvider.deleteFile(file.name);

    await this.filesRepository.delete(id);
  }
}

export { DeleteFileService };
