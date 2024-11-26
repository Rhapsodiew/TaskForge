// import {IsNotEmpty} from "class-validator";
// CLASS VALIDATOR

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

// insert ? at the end