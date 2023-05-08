import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

type Response<T> = {
	statusCode: number;
	data: T;
	message: string;
};

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		const response: ExpressResponse = context.switchToHttp().getResponse();
		const status = response.statusCode;

		return next.handle().pipe(
			map(
				(res) => {
					console.log(res);
					return {
						statusCode: status,
						data: res,
						message: 'Success'
					};
				},
				catchError((err) => {
					throw new HttpException(err?.response?.message || err.message, err.status);
				})
			)
		);
	}
}
