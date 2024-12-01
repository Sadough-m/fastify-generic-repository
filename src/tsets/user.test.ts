import Fastify from 'fastify';
import  userRoutes  from '../modules/user/user.routes';
import { initializeDatabase } from '../modules/plugins/dataSource'
import { UserRepository } from '../modules/user/user.repository'

describe('User Routes', () => {
	const app = Fastify();

	beforeAll(async () => {
		await initializeDatabase();
		app.register(userRoutes);
		await app.ready();
	});

	afterAll(async () => {
	const repository = new UserRepository();
	await repository.deleteAll()

		await app.close(); // Close server after tests
	});

	it('POST /user should create a user', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/user',
			payload: {
				name: 'John1',
				age: 30,
				email: 'john@gmail.com',
			},
		});
		const getUserDTO = JSON.parse(response.body);

		expect(response.statusCode).toBe(200);
		expect(getUserDTO.data).not.toBeNull();
		expect(getUserDTO.data).not.toBeUndefined();
		expect(getUserDTO.data).toHaveProperty('name', 'John1');
	});
	it('POST /user should get filtered users', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/getUsers',
			payload: {
				name: 'John1',
				age: {
					number:30,
					equality: '='
				},
			},
		});
		const getUserDTO = JSON.parse(response.body);

		expect(response.statusCode).toBe(200);
		expect(getUserDTO.data).not.toBeNull();
		expect(getUserDTO.data).not.toBeUndefined();
		expect(Array.isArray(getUserDTO.data)).toBe(true);

		expect(getUserDTO.data[0]).toHaveProperty('name', 'John1');
	});
});

