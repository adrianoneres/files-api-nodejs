import { FakeFilesRepository } from '@modules/files/repositories/fakes/FakeFilesRepository';
import { FakeStorageProvider } from '@shared/containers/providers/StorageProvider/fakes/FakeStorageProvider';
import { CreateFileService } from '@modules/files/services/CreateFileService';

let fakeFilesRepository: FakeFilesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createFileService: CreateFileService;

describe('CreateFileService', () => {
  beforeEach(() => {
    fakeFilesRepository = new FakeFilesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createFileService = new CreateFileService(
      fakeFilesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new file', async () => {
    const file = await createFileService.execute({
      name: 'Test file',
    });

    expect(file).toHaveProperty('id');
    expect(file.name).toEqual('Test file');
  });
});
