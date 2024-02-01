import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // 用于查询
  // @Get(':username')
  // findTar(@Param('username') username: string) {
  //   return this.userService.findTar(username);
  // }
  @Get('query')
  findTar(@Query('username') username: string) {
    return this.userService.findTar(username);
  }

  // 用于登录
  @Get('login')
  findOne(
    @Query('username') username: string,
    @Query('password') password: string
  ) {
    return this.userService.findOne(username, password);
  }

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(username, updateUserDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.userService.remove(username);
  }
}

