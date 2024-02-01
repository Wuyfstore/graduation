// 注册menu实体
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MenuItem } from './menuItem.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  icon: string;

  // () => MenuItem 定义关联表  (Item) => Item.menu反向字段
  @OneToMany(() => MenuItem, (Item) => Item.menu)
  children: MenuItem[];
}
