import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Logger as CustomLogger } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: CustomLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap((response) => {
        const delay = Date.now() - now;
        const user = request.user?.email || 'Anonymous';

        this.logger.log(
          `${method} ${url} - ${response?.statusCode || 200} - ${delay}ms - User: ${user}`,
          'HttpRequest',
        );
      }),
      catchError((error) => {
        const delay = Date.now() - now;
        const user = request.user?.email || 'Anonymous';

        this.logger.error(
          `${method} ${url} - ${error.status || 500} - ${delay}ms - User: ${user}`,
          error.stack,
          'HttpRequest',
        );

        throw error;
      }),
    );
  }
}
