import { Body, Controller, Get, Inject, Param, Post, Req } from "@nestjs/common";
import type {Request} from 'express'
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Get('users')
    async getUsers(){
        const users = await this.userService.getUsers()
        return {
            success: true,
            data: users
        }
    }

    @Get('user/:userId')
    async getUser(
        @Param('userId') userId:string
    ){
        const user = await this.userService.getUser(userId)
        if(!user){
            return {
                success: false,
                message: '유저가 없습니다.',
                data: null
            }
        }
        return {
            success: true,
            data: user
        }
    }

    @Post('user')
    async saveUser(
        @Body() data
    ){
        try {
            const profile = await this.userService.saveProfile(data)
            const user = await this.userService.saveUser(data, profile)
            return {
                success: true,
                data: user
            }
        } catch (err) {
            throw err
        }
    }
}