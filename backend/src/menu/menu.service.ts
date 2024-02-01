import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuItem } from './entities/menuItem.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly Menus: Repository<Menu>,
    @InjectRepository(MenuItem)
    private readonly MenuItems: Repository<MenuItem>
  ) {}

  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  async findAll() {
    const menus = await this.Menus.find({ relations: ['children'] });
    if (menus)
      return {
        data: menus,
        count: menus.length,
        status: 200,
      };
    else
      return {
        data: menus,
        count: 0,
        status: 400,
      };
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
