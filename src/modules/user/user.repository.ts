import { GenericRepository } from "../utils/generic.repository";
import { User } from "./user.entity";

export class UserRepository extends GenericRepository<User> {
	constructor() {
		super(User);
	}
}
