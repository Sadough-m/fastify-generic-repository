declare module 'fastify-rate-limit' {
	import { FastifyPluginCallback } from 'fastify';

	interface RateLimitOptions {
		max?: number;
		timeWindow?: string | number;
		cache?: number;
		allowList?: string[] | ((req: any, key: string) => boolean | Promise<boolean>);
		keyGenerator?: (req: any) => string;
		skipOnError?: boolean;
		errorResponseBuilder?: (req: any, context: any) => object;
	}

	const fastifyRateLimit: FastifyPluginCallback<RateLimitOptions>;
	export default fastifyRateLimit;
}
