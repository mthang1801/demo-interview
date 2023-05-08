import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

class CmdChainDto {
	@IsNotEmpty()
	@IsString()
	type: string;

	@ValidateNested()
	@Type(() => CreateUserDto)
	cmd: CreateUserDto[];
}

export class CreateMultipleUserDto {
	@IsNotEmpty()
	type: string;

	@Type(() => CmdChainDto)
	cmd_chain: CmdChainDto;
}
