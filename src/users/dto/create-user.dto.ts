import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Link } from "src/links/entities"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name : string

    @IsString()
    perfilImage ?: string

    // @IsString({ each: true })
    @IsArray()
    @IsOptional()
    links ?: Link[]
}
