import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async readAll(): Promise<UserDTO[]> {
    try {
      return await this.userRepository.find({});
    } catch (error) {
      return [];
    }
  }

  async validateCredentials(user: UserDTO): Promise<boolean> {
    const _user = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (_user) {
      const passwd = _user.checkPassword(user.password);
      return passwd;
    }
    return false;
  }

  async validateLogin(user: UserDTO): Promise<boolean> {
    const _user = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    return _user ? _user.isActive : false;
  }

  async createAccount(user: UserDTO): Promise<boolean> {
    const userExists = await this.validateLogin(user);
    if (!userExists) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      try {
        await this.userRepository.insert(user);
        return true;
      } catch (error) {
        console.error('Error al crear el usuario:', error);
      }
    }
    return false;
  }
}
