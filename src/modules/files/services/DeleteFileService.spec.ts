import { AppError } from '@shared/errors/AppError';
import { FakeFilesRepository } from '@modules/files/repositories/fakes/FakeFilesRepository';
import { FakeStorageProvider } from '@shared/containers/providers/StorageProvider/fakes/FakeStorageProvider';
import { DeleteFileService } from '@modules/files/services/DeleteFileService';

let fakeFilesRepository: FakeFilesRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteFileService: DeleteFileService;

describe('DeleteFileService', () => {
  beforeEach(() => {
    fakeFilesRepository = new FakeFilesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    deleteFileService = new DeleteFileService(
      fakeFilesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to delete a file', async () => {
    const file = await fakeFilesRepository.create({
      name: 'Test file',
      url: '/test/Test file.txt',
    });

    await deleteFileService.execute({ id: file.id });
    const existingFile = await fakeFilesRepository.findById(file.id);

    expect(existingFile).toBeUndefined();
  });

  it('should not be able to delete a file with a non-existent id', async () => {
    await expect(
      deleteFileService.execute({
        id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
