import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PostService } from "./post.service";

@Controller('post')
export class PostController {
    constructor(
        private postservice: PostService
    ){}

    @Get('posts')
    async GetPosts(){
        
    }

    @Post(':postId')
    async PostPost(){

    }

    @Delete(':postId')
    async DeletePost(){

    }
    
    @Put(':postId')
    async PutPost(){

    }
}