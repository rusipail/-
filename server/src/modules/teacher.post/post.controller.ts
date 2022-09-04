import { Body, Controller, Get, Inject, Param, Post, Req } from "@nestjs/common";
import type {Request} from 'express'
import { UserService } from "../teacher.user/user.service";
import {PostService} from './post.service'

@Controller('post')
export class PostController {
    constructor(
        private postService:PostService,
        private userService:UserService
    ){}

    @Get('posts')
    async getPosts(){
        return await this.postService.getPosts()
    }

    @Get('post/:postId')
    async getPost(
        @Param() postId: string
    ){
        const post = await this.postService.getPost(postId)
        if(!post) {
            return {
                success: false,
                message: `해당 게시글이 없습니다.`,
                data: null
            }
        }
        return {
            success: true,
            data: post
        }
    }

    @Post('post')
    async savePost(
        @Req() req:Request,
        @Body() data
    ){
        // jwt_token으로부터 req 객체에 user property가 추가됨
        const user_id = req.user?.id || '3bead6f7-abcd-4c51-8676-996f030fa357'
        const user = await this.userService.getUser(user_id, false)
        console.log(user)
        // const savedPost = await this.postService.savePost(data, user)
        return {
            success: true,
            data: ''
        }
    }
}