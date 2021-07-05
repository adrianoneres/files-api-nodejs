import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { File } from '@modules/files/infra/typeorm/entities/File';
import { IFilesRepository } from '@modules/files/repositories/IFilesRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<File | undefined> {
    const file = await this.filesRepository.findById(id);

    if (!file) {
      throw new AppError(
        'Nenhum arquivo encontrado com o identificador informado',
      );
    }

    return file;
  }
}

export { ShowFileService };
