import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { log } from 'console';
import { MulterError } from 'multer';

@Catch(MulterError)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let message = 'File upload error';

    log('exception', exception)
    if (exception.code === 'LIMIT_FILE_SIZE') {
      message = 'File is too large. Max size is 5MB.';
    } else if (exception.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Unexpected file field.';
    }

    return response.status(400).json({
      statusCode: 400,
      message,
    });
  }
}
