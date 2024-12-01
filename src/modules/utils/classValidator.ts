import { plainToInstance, Type } from 'class-transformer';
import { IsArray, IsObject, validate, ValidateNested } from 'class-validator';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IsString, IsEmail, IsBoolean, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

class Error {
	property!: string
	constraints!: string
}

export class ReplyPayload {

	constructor(status:'success' | 'failure',message: string='',data: any=null, errors: Error[]|any = []) {
		this.message = message
		this.error = errors
		this.data = data
		this.status = status
	}
	@IsString()
	status: 'success' | 'failure'
	@IsString()
	message!: string;
	@IsArray()
	// @ValidateNested({ each: true }) // Validates each item in the array
	@Type(() => Error)
	@IsOptional()
	error!: Error[]|any;
	@IsOptional()
	data: any[]|any
	@IsOptional()
	statusCode!: number
}
export const replySchema:any = validationMetadatasToSchemas()['ReplyPayload']

export const replayPayload = (payload: ReplyPayload) => {
	return {
		message: payload.message,
		errors: payload.error,
	}
}

export const validateRequest = async (dto:any,req: FastifyRequest, reply: FastifyReply) => {
		// Transform the request body to the DTO instance
		const instance = plainToInstance(dto, req.body);
		if (!instance) reply.status(400).send(replayPayload(new ReplyPayload('failure')));

		// Validate the instance
		const errors = await validate(instance as typeof dto);
		if (errors.length > 0) {
			reply.status(400).send(new ReplyPayload('failure','Validation failed',
				errors.map((err) => (Object.assign(new Error(), {
				property: err.property,
				constraints: err.constraints,
			})))))
		}
		// Replace body with the validated and transformed instance
		req.body = instance;
	};
