import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      (typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse?.['message']) ||
      exception.message ||
      'Internal server error';

    const error = exceptionResponse?.['error'] || exception.name || 'Error';

    response.status(status).json({
      success: false,
      message,
      error,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
