import { IFilesRepository } from '@modules/files/repositories/IFilesRepository';
import { File } from '@modules/files/infra/typeorm/entities/File';
import { ICreateFileDTO } from '@modules/files/dtos/ICreateFileDTO';

class FakeFilesRepository implements IFilesRepository {
  private files: File[] = [];

  public async findById(id: string): Promise<File | undefined> {
    const file = this.files.find(existingFile => existingFile.id === id);

    return file;
  }

  public async create({ name, url }: ICreateFileDTO): Promise<File> {
    const file = new File();

    Object.assign(file, {
      name,
      url,
    });

    this.files.push(file);

    return file;
  }

  public async save(file: File): Promise<File> {
    const fileIndex = this.files.findIndex(
      existingFile => existingFile.id === file.id,
    );

    this.files[fileIndex] = file;

    return file;
  }

  public async delete(id: string): Promise<void> {
    const fileIndex = this.files.findIndex(
      existingFile => existingFile.id === id,
    );

    if (fileIndex >= 0) {
      this.files.splice(fileIndex, 1);
    }
  }
}

export { FakeFilesRepository };
