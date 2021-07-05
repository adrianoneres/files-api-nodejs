import { AppError } from '@shared/errors/AppError';
import { FakeFilesRepository } from '@modules/files/repositories/fakes/FakeFilesRepository';
import { ShowFileService } from '@modules/files/services/ShowFileService';

let fakeFilesRepository: FakeFilesRepository;
let showFileService: ShowFileService;

describe('ShowFileService', () => {
  beforeEach(() => {
    fakeFilesRepository = new FakeFilesRepository();
    showFileService = new ShowFileService(fakeFilesRepository);
  });

  it('should be able to show a file', async () => {
    const file = await fakeFilesRepository.create({
      name: 'Test file',
      url: '/test/Test file.txt',
    });

    const response = await showFileService.execute({
      id: file.id,
    });

    expect(response?.id).toBe(file.id);
    expect(response?.name).toBe(file.name);
    expect(response?.url).toBe(file.url);
  });

  it('should not be able to show a file with a non-existent id', async () => {
    await expect(
      showFileService.execute({
        id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
