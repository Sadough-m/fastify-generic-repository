import { UserRepository } from "./user.repository";
import { GetUserDTO, User } from "./user.entity";
import { plainToInstance } from 'class-transformer'

export class UserService {
	private repository = new UserRepository();

	async createUser(user: User): Promise<User> {
		return await this.repository.create(user);
	}

	async getAllUsers(): Promise<User[]> {
		return await this.repository.findAll();
	}

	async filterUsers(getUserDto:GetUserDTO): Promise<User[]> {
		const isTestEnv = process.env.NODE_ENV === 'test';

		const dbName = isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME
		const userName = `%${getUserDto.name}%`
		const equality = getUserDto.age.equality
		const number = getUserDto.age.number
		const sqlStatement: string = `SELECT * FROM ${dbName}.user as U WHERE U.name LIKE ? && U.age ${equality} ?`;
		return await this.repository.query(sqlStatement,[userName,number]);
	}

	async getUserById(id: number): Promise<User | null> {
		return await this.repository.findById(id);
	}
}
