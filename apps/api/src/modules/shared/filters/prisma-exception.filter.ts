import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '../../../generated/prisma/client';

type PrismaError =
  Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientInitializationError;

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: PrismaError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    const { status, message, code } = this.mapError(exception);

    // Full detail stays in server logs; the client gets a clean message only.
    this.logger.error(`Prisma ${code}: ${exception.message.split('\n').pop()}`);

    response.status(status).json({ statusCode: status, message });
  }

  private mapError(exception: PrismaError): {
    status: number;
    message: string;
    code: string;
  } {
    if (exception instanceof Prisma.PrismaClientInitializationError) {
      return {
        status: HttpStatus.SERVICE_UNAVAILABLE,
        message:
          'Database is temporarily unavailable. Please try again shortly.',
        code: exception.errorCode ?? 'INIT',
      };
    }

    switch (exception.code) {
      case 'P1001': // can't reach database server
      case 'P1002': // database server timed out
      case 'P1008': // operation timed out
      case 'P1017': // server closed the connection
        return {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message:
            'Database is temporarily unavailable. Please try again shortly.',
          code: exception.code,
        };
      case 'P2002': // unique constraint violation
        return {
          status: HttpStatus.CONFLICT,
          message: 'A record with these details already exists.',
          code: exception.code,
        };
      case 'P2025': // record not found
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'The requested record was not found.',
          code: exception.code,
        };
      case 'P2003': // foreign key constraint failed
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid reference to a related record.',
          code: exception.code,
        };
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong. Please try again.',
          code: exception.code,
        };
    }
  }
}
