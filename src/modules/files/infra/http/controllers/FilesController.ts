import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateFileService } from '@modules/files/services/CreateFileService';
import { ShowFileService } from '@modules/files/services/ShowFileService';
import { DeleteFileService } from '@modules/files/services/DeleteFileService';

class FilesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const createFileService = container.resolve(CreateFileService);

    const newFile = await createFileService.execute({
      name: file.filename,
    });

    return response.status(201).json(newFile);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showFileService = container.resolve(ShowFileService);

    const file = await showFileService.execute({ id });

    return response.json(file);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteFileService = container.resolve(DeleteFileService);

    await deleteFileService.execute({ id: String(id) });

    return response.status(204).send();
  }
}

export { FilesController };
