import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { IsString, IsEmail, IsBoolean, IsNumber, IsNotEmpty, IsOptional, ValidateNested, isNumber, IsEnum, IsObject } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { Type } from 'class-transformer'


@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	@Index()
	@IsString()
	@IsNotEmpty()
	name!: string;

	@Column()
	@IsEmail()
	@IsOptional()
	email!: string;

	@Column()
	@Index()
	@IsNumber()
	@IsNotEmpty()
	age!: number;
}
export const userSchema:any = validationMetadatasToSchemas()['User']

enum equation {
	'>',
	'<' ,
	'='
}
export class NumberFilter {
	@IsNumber()
	number!: number
	@IsString()
	@IsEnum(equation)
	equality!: equation
}
export class GetUserDTO{
	@IsOptional()
	@IsObject()
	// @ValidateNested({ each: true }) // Validates each item in the array
	@Type(() => NumberFilter)
	age!: NumberFilter
	@IsOptional()
	@IsString()
	name!: string


}

