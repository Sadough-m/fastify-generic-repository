import fastifySwagger from "fastify-swagger";

export const swaggerPlugin = async (fastify: any) => {
	fastify.register(fastifySwagger, {
		routePrefix: "/swagger",
		swagger: {
			info: {
				title: "Fastify Microservice API",
				description: "API documentation",
				version: "1.0.0",
			},
		},
		exposeRoute: true,
	});
};
