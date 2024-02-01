import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuItem } from './entities/menuItem.entity';

@Module({
  // Menu 关联 MenuItem
  imports: [TypeOrmModule.forFeature([Menu, MenuItem])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
