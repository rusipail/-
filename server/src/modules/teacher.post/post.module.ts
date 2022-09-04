import {Module} from '@nestjs/common'
import {PostController} from './post.controller'
import {PostService} from './post.service'
import {User, Post, Profile} from '@/teacher.entity'
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserService } from '../teacher.user/user.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, Post, Profile])],
    controllers: [PostController],
    providers: [PostService, UserService],
    exports: [],
})
export class PostModule {}