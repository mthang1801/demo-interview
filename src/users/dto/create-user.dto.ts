import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@IsNumber()
	Uid: number;

	@IsNotEmpty()
	@IsString()
	Username: string;

	@IsNotEmpty()
	@IsString()
	City: string;

	@IsOptional()
	@IsNumber()
	Friend: number;
}
