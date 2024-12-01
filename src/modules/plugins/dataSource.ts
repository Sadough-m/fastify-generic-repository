import { DataSource } from "typeorm";
import mysql from 'mysql2/promise';
import * as dotenv from "dotenv";
dotenv.config();
const isTestEnv = process.env.NODE_ENV === 'test';

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT? parseInt(process.env.DB_PORT, 10) : 3306,
	username:process.env.DB_USER_NAME,
	password:process.env.DB_USER_PASS,
	database: isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
	synchronize: true, // Set to false in production
	logging: false,
	entities: ["src/modules/**/*.entity.ts"],
});

export const initializeDatabase = async () => {
	await createDatabase();
	await AppDataSource.initialize();
	console.log("Database connected");

};


const createDatabase = async () => {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER_NAME,
		password: process.env.DB_USER_PASS,
	});

	try {
		const isTestEnv = process.env.NODE_ENV === 'test';

		const dbName = isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME;
		await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
		console.log(`Database "${dbName}" created successfully.`);
	} catch (err) {
		console.error('Error creating database:', err);
	} finally {
		await connection.end();
	}
};


