import {Module} from '@nestjs/common'
import {UserController} from './user.controller'
import {UserService} from './user.service'
import {User, Profile} from '@/teacher.entity'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    controllers: [UserController],
    providers: [UserService],
    exports: [],
})
export class UserModule {}