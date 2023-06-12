import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  async login(@Body() user: UserDTO): Promise<boolean> {
    const results = await this.usersService.validateCredentials(user);
    return results;
  }

  @Post('register')
  async register(@Body() user: UserDTO): Promise<boolean> {
    const results = await this.usersService.createAccount(user);
    return results;
  }
}
