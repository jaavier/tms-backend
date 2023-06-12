import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  isActive: boolean;
}
