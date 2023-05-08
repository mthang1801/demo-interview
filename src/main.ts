import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv/config';
import { AppModule } from './app.module';
import AppDataSource from './cores/database';

async function bootstrap() {
	const app = NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true });
	(await app).useBodyParser("raw");
	(await app).useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			errorHttpStatusCode: HttpStatus.BAD_REQUEST,
			forbidNonWhitelisted: false,
			disableErrorMessages: false,
			skipMissingProperties: false
		})
	);

	(await app).listen(+process.env.PORT);
}

AppDataSource.initialize()
	.then(bootstrap)
	.catch((err) => console.log(err));
