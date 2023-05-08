import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './configs';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			load: [databaseConfig],
			cache: true
		}),
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				logging: true,
				synchronize: true,
				entities: [__dirname + '/**/*.entity.{js,ts}'],
				type: 'mysql',
				host: configService.get<string>('database.master.host'),
				port: Number(configService.get<string>('database.master.port')),
				username: configService.get<string>('database.master.username'),
				password: configService.get<string>('database.master.password'),
				database: configService.get<string>('database.master.name')
			}),
			inject: [ConfigService]
		}),
		UsersModule
	],
	controllers: [AppController],
	providers: [
		AppService
		// {
		// 	provide: APP_FILTER,
		// 	useClass: HttpExceptionFilter
		// },
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: TransformInterceptor
		// }
	]
})
export class AppModule {}
