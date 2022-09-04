import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "@/entity/post.entity"
import { PostController } from "./post.controller";
import { PostService } from "../teacher.post/post.service";
import { PostCustomRepository } from "./post.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Post])
    ],
    controllers: [PostController],
    providers: [PostService, PostCustomRepository]
})
export class PostModule {}