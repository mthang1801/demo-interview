import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'Th@ng1995',
	database: 'demo_interview',
	entities: [User],
	subscribers: [],
	synchronize: true,
	logging: true
});

export default AppDataSource;
