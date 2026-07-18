import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
type PrismaError = Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientInitializationError;
export declare class PrismaExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: PrismaError, host: ArgumentsHost): void;
    private mapError;
}
export {};
