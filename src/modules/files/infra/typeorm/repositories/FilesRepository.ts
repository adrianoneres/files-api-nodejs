import { getRepository, Repository } from 'typeorm';

import { File } from '@modules/files/infra/typeorm/entities/File';
import { IFilesRepository } from '@modules/files/repositories/IFilesRepository';
import { ICreateFileDTO } from '@modules/files/dtos/ICreateFileDTO';

class FilesRepository implements IFilesRepository {
  private filesRepository: Repository<File>;

  constructor() {
    this.filesRepository = getRepository(File);
  }

  public async findById(id: string): Promise<File | undefined> {
    return this.filesRepository.findOne(id);
  }

  public async create({ name, url }: ICreateFileDTO): Promise<File> {
    const file = this.filesRepository.create({ name, url });

    return this.filesRepository.save(file);
  }

  public async save(file: File): Promise<File> {
    return this.filesRepository.save(file);
  }

  public async delete(id: string): Promise<void> {
    this.filesRepository.delete(id);
  }
}

export { FilesRepository };
