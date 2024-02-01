import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NtprojectModule } from './ntproject/ntproject.module';
//连接数据库
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { MenuModule } from './menu/menu.module';
import { threeModule } from './three/three.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '123456',
      host: 'localhost',
      port: 3306,
      database: 'nantong',
      synchronize: true,
      retryDelay: 500,
      retryAttempts: 3,
      autoLoadEntities: true,
    }),
    UserModule,
    NtprojectModule,
    MenuModule,
    threeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
