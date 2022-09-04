import { Controller, Get, Inject, Param, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import {Request} from 'express'

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Get('users')
    async getUsers(){
        
    }

    @Post('user')
    async saveUser(
        @Req() req:Request
    ){
        const {body} = req
        
    }

    @Get('user/:id')
    async getUser(
        @Param('id') id:string
    ){
        
    }
}