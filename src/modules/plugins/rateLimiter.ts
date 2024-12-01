import fastifyRateLimit from "fastify-rate-limit";

export const rateLimiterPlugin = async (fastify: any) => {
	fastify.register(fastifyRateLimit, {
		max: 5,
		timeWindow: "1 minute",
	});
};
