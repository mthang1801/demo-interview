import { Injectable } from '@nestjs/common';
import AppDataSource from 'src/cores/database';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	async create(data) {
		const responseData = {
			status: 'ok',
			dbState: []
		};
		try {
			const cmdChains = data.cmd_chain.map(({ cmd }) => cmd);
			const cmdChainsFormat = cmdChains.map((cmd) => {
				const splitCmd = cmd.split('VALUES');
				const insert = splitCmd[0];
				const values = splitCmd[1];
				const valuesSplit = values
					.replace('(', '')
					.replace(')', '')
					.replace(';', '')
					.trim()
					.split(',')
					.map((item) => item.trim());

				const valuesFormat = valuesSplit
					.map((value) => {
						return isNaN(+value) && value ? `"${value}"` : value;
					})
					.join(',');

				return `${insert} VALUES (${valuesFormat})`;
			});

			if (cmdChainsFormat.length) {
				await Promise.all(
					cmdChainsFormat.map(async (cmd) => {
						await AppDataSource.manager.query(cmd);
					})
				);
			}
		} catch (error) {
			responseData.status = 'error';
		} finally {
			const users = await this.findAllUsers();
			responseData.dbState = users;
			return responseData;
		}
	}

	async findAllUsers() {
		return AppDataSource.getRepository(User).find();
	}
}
