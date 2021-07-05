import { File } from '@modules/files/infra/typeorm/entities/File';
import { ICreateFileDTO } from '@modules/files/dtos/ICreateFileDTO';

interface IFilesRepository {
  findById(id: string): Promise<File | undefined>;
  create(file: ICreateFileDTO): Promise<File>;
  save(file: File): Promise<File>;
  delete(id: string): Promise<void>;
}

export { IFilesRepository };
