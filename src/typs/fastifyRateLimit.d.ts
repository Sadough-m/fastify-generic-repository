declare module 'fastify-rate-limit' {
	import { FastifyPluginCallback } from 'fastify';

	interface RateLimitOptions {
		max?: number; // Maximum number of requests per time window
		timeWindow?: string | number; // Time window in milliseconds or a string like '1 minute'
		cache?: number; // The maximum size of the LRU cache
		allowList?: string[] | ((req: any) => boolean); // Array of whitelisted IPs or a function
		keyGenerator?: (req: any) => string; // Custom function to generate keys
		errorResponseBuilder?: (req: any, context: any) => object; // Function to build error response
		ban?: number; // Ban IP after a number of failed attempts
	}

	const fastifyRateLimit: FastifyPluginCallback<RateLimitOptions>;

	export default fastifyRateLimit;
}
