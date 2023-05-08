import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('/addMultiple')
	create(@Body() body ) {
		return this.usersService.create(body);
	}
}
