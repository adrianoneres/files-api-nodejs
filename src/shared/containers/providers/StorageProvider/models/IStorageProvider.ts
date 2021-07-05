interface IStorageProvider {
  saveFile(name: string): Promise<string>;
  deleteFile(name: string): Promise<void>;
}

export { IStorageProvider };
