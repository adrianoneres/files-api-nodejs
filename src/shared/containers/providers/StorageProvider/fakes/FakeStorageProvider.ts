import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private files: string[] = [];

  public async saveFile(name: string): Promise<string> {
    this.files.push(name);

    return name;
  }

  public async deleteFile(name: string): Promise<void> {
    const findIndex = this.files.findIndex(file => file === name);

    this.files.splice(findIndex, 1);
  }
}

export { FakeStorageProvider };
