import { Injectable, Logger } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadFileMiddleware implements MulterOptionsFactory {
  private logger = new Logger(UploadFileMiddleware.name);

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: path.join(__dirname,'..',"..","..","uploads"),
        filename: (req: any, file, cb) => {
          this.logger.log(file);

          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const extension = file.originalname.split('.').pop();
          const filename = `${uuidv4()}-${uniqueSuffix}.${extension}`;
          if (file) {
            req.filename = filename;
          }
          cb(null, filename);
        },
      }),
    };
  }
}