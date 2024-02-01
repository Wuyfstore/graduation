import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.password = createUserDto.password;
    this.user.save(newUser);
    return `This action adds a new user with username ${newUser.username}`;
  }

  async findAll() {
    const data = await this.user.find();
    if (data)
      return {
        data: data,
        count: data.length,
        status: 200,
        message: 'Get users data successgully',
      };
    else
      return {
        data: data,
        count: 0,
        status: 400,
        message: 'Failed to get Users data',
      };
  }

  // 用于查询
  async findTar(username: string) {
    const user = await this.user.find({
      where: { username: Like(`%${username}%`) },
    });
    const count = await this.user.count({
      where: { username: Like(`%${username}%`) },
    });
    if (user) {
      return {
        data: user,
        count: count,
        status: 200,
        message: 'Get target User',
      };
    } else {
      return {
        data: user,
        count: count,
        status: 400,
        message: 'Failed',
      };
    }
  }

  // 用于登录
  async findOne(username: string, password: string) {
    const user = await this.user.findOne({
      where: { username: username },
    });
    if (user && user.password === password) {
      return {
        status: 200,
        message: '用户存在且密码正确',
      };
    }
    return {
      status: 400,
      message: '用户不存在或者密码错误',
    };
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return this.user.update(username, updateUserDto);
  }

  async remove(username: string) {
    const user = await this.user.findOne({ where: { username } });
    if (user) {
      await this.user.remove(user);
      return `User with username ${username} has been removed successfully!`;
    } else {
      throw new NotFoundException(
        `User with username ${username} does not exist.`
      );
    }
  }
}

