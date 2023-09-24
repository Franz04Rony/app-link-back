import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    perfilImage: string

}
