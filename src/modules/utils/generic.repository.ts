import { Repository, EntityTarget, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../plugins/dataSource";

export class GenericRepository<T extends ObjectLiteral> {
	private repository: Repository<T>;

	constructor(entity: EntityTarget<T>) {
		this.repository = AppDataSource.getRepository(entity);
	}

	async query(query: string,parameter:any): Promise<T[]> {
	return await	this.repository.query(query,parameter);
	}

	async create(item: T): Promise<T> {
		const entity = this.repository.create(item);
		return await this.repository.save(entity);
	}

	async findAll(): Promise<T[]> {
		return await this.repository.find();
	}

	async findById(id: any): Promise<T | null> {
		return await this.repository.findOneBy({ id } as any);
	}

	async update(id: any, updatedItem: Partial<T>): Promise<T | null> {
		const entity = await this.repository.findOneBy({ id } as any);
		if (entity) {
			Object.assign(entity, updatedItem);
			return await this.repository.save(entity);
		}
		return null;
	}

	async delete(id: any): Promise<boolean> {
		const result = await this.repository.delete(id);
		return !!result.affected;
	}
	async deleteAll(): Promise<void> {
		return await this.repository.clear();
	}
}
