import { Module } from '@nestjs/common';
import { threeService } from './three.service';
import { threeController } from './three.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boundary } from './entites/boundary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boundary])],
  controllers: [threeController],
  providers: [threeService],
})
export class threeModule {}

