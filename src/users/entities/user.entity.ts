import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
	@PrimaryColumn()
	Uid: number;

	@Column()
	Username: string;

	@Column()
	City: string;

	@Column({ nullable: true })
	Friend: string;
}
