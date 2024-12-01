import fastify from "fastify";
import { swaggerPlugin } from "./modules/plugins/swagger";
import { rateLimiterPlugin } from "./modules/plugins/rateLimiter";
import userRoutes from "./modules/user/user.routes";
import { initializeDatabase } from "./modules/plugins/dataSource";
import * as dotenv from "dotenv";

dotenv.config();
const app = fastify({ logger: true });

(async () => {
	// Plugins
	await initializeDatabase(); // Initialize MySQL database
	await swaggerPlugin(app);
	await rateLimiterPlugin(app);

	// Routes
	app.register(userRoutes, { prefix: "/api" });

	// Start Server
	try {
		await app.listen({ port:process.env.PORT?parseInt(process.env.PORT):3000 });
		console.log(`Server running at http://${process.env.HOST+':'+process.env.PORT}`);
	} catch (err) {
		console.log('err',err)
		app.log.error(err);
		process.exit(1);
	}
})();
