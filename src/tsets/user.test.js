"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const dataSource_1 = require("../modules/plugins/dataSource");
const user_repository_1 = require("../modules/user/user.repository");
describe('User Routes', () => {
    const app = (0, fastify_1.default)();
    beforeAll(async () => {
        await (0, dataSource_1.initializeDatabase)();
        app.register(user_routes_1.default);
        await app.ready();
    });
    afterAll(async () => {
        const repository = new user_repository_1.UserRepository();
        await repository.deleteAll();
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
                    number: 30,
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
