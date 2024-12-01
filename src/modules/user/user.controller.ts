import { FastifyInstance } from "fastify";
import { UserService } from "./user.service";
import { GetUserDTO, User, userSchema } from './user.entity'
import { replayPayload, ReplyPayload, replySchema, validateRequest } from '../utils/classValidator'
import { plainToInstance } from 'class-transformer'

const userService = new UserService();

export const userRoutes = (fastify: FastifyInstance, options: any, done: () => void) => {
	fastify.post("/user",
		{
			// preValidation: validateRequest(User),
			schema: {
				body: userSchema,
				response: {
					200: replySchema,
				},
			},
		},
		async (request, reply) => {
			try {

				const user = await userService.createUser(request.body as any);
				reply.send(new ReplyPayload('success','',user));
			} catch (err) {
				console.log('err',err)
				reply.status(500).send(replayPayload(new ReplyPayload('failure', 'database problem',null)));

			}
		});

	fastify.post("/getUsers",
		{
			schema: {
				body: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						age: {
							type: 'object',
							properties: {
								number: { type: 'number' },
								equality: { type: 'string', enum: [">", "<", "="] },
							},
							required: ['number', 'equality'],
						},
					},
					required: [],
				},
				response: {
					200: replySchema,
				},
			},
		},
		async (request, reply) => {

			try {
				const getUserDTO = plainToInstance(GetUserDTO, request.body);

				const users = await userService.filterUsers(getUserDTO);
				const replyPayload = new ReplyPayload('success', '', users)
				reply.send(replyPayload);

			} catch (err) {
				console.log('err',err)
				reply.status(500).send(replayPayload(new ReplyPayload('failure', 'database problem', null)));

			}
		});

	done();
};
