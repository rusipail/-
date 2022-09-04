import { Module } from '@nestjs/common';
import {AppController} from './app.controller'
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {JwtModule} from '@nestjs/jwt'

// 여기에 학생들의 모듈을 올려주세요
// import {UserModule} from '@/modules/user/user.module'
import {AuthModule} from '@/modules/auth/auth.module'

// 예제 모듈
// *******************************************************
import {UserModule} from '@/modules/teacher.user/user.module'
import {PostModule} from '@/modules/teacher.post/post.module'
// *******************************************************

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'better-sqlite3',
        database: 'db/project.db',
        entities: [
          __dirname + "../../../teacher.entity/**/*.entity{.ts,.js}",
        ],
        statementCacheSize: 100,
        synchronize: true,
        logging: true
      })
    }),
    AuthModule,
    UserModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
