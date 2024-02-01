// 注册menu实体
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column()
  icon: string;

  @Column()
  path: string;

  @Column()
  foreignId: number;

  @ManyToOne(() => Menu, (Menu) => Menu.children)
  @JoinColumn({ name: 'foreignId' }) // 在这里指定关联字段的名称为 'foreignId'
  menu: Menu;
}
