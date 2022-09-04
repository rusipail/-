/**
 * Module => User에 관련된 모든 것!!!!
 *  - controller: 라우팅!!
 *  - service: 실행될 함수!! 
 *  - repository: DB에 직접 접근해서 데이터를 가공하는 역할!! => Typeorm
 *      - entity => Database의 테이블!! (객체!!)
 */

import {Module} from '@nestjs/common'
import {UserController} from './user.controller'
import {UserService} from './user.service'
import {UserCustomRepository} from './user.repository'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User, Profile} from '@/teacher.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Profile])
    ],
    controllers: [UserController],
    providers: [UserService, UserCustomRepository]
})
export class UserModule {}