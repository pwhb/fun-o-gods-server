import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import strings from './consts/strings.json';
import { stringToCONST } from './config';
import fs from 'fs';

export function updateConsts(message: string) {
  if (message && !strings[stringToCONST(message)]) {
    const update = {
      ...strings,
      [stringToCONST(message)]: message,
    };
    fs.writeFileSync(
      'src/lib/consts/strings.json',
      JSON.stringify(update, null, 2),
    );
  }
}
@Injectable()
export class DevInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        updateConsts(data.message);
        Logger.log(
          `${Date.now() - now}ms`,
          context.getClass().name,
          context.getHandler().name,
        );
      }),
      catchError((error) => {
        Logger.log(
          `${Date.now() - now}ms`,
          context.getClass().name,
          context.getHandler().name,
        );
        return throwError(() => error);
      }),
    );
  }
}
