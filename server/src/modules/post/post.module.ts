import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "@/entity/post.entity"
import { PostController } from "./post.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Post])
    ],
    controllers: [PostController],
    providers: []
})
export class PostModule {}