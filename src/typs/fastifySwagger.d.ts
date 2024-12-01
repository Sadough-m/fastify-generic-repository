declare module 'fastify-swagger' {
	import { FastifyPluginCallback } from 'fastify';

	export interface SwaggerOptions {
		swagger?: {
			info: {
				title: string;
				description: string;
				version: string;
			};
			host?: string;
			schemes?: string[];
			consumes?: string[];
			produces?: string[];
			securityDefinitions?: Record<string, any>;
			definitions?: Record<string, any>;
		};
		routePrefix?: string;
		exposeRoute?: boolean;
	}

	const fastifySwagger: FastifyPluginCallback<SwaggerOptions>;
	export default fastifySwagger;
}
