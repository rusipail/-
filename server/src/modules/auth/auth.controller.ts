import { Controller, Get, HttpException, Res, Req, UseGuards, Redirect } from "@nestjs/common";
import type { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard'
import { config } from '../../../config'

@Controller('oauth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Get('login')
    @UseGuards(AuthGuard('google'))
    login() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async OAuthGoogleCallback(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const token = await this.authService.createToken(req.user)
            res.header('Authorization', `Bearer ${token}`)
            res.redirect(`${config.BASE_URL}?token=${token}`)
        } catch (err) {
            throw HttpException
        }
    }

    // <Authorization: Bearer jwt_token> 형식으로 요청을 보내세요. jwt 인증에 성공하면 req.user에 jwt를 decoding한 object가 추가됩니다.
    // 로그인이 필요한 resource엔 @UseGuards(JwtAuthGuard) 만 붙여주면 됩니다.
    @Get('/check')
    @UseGuards(JwtAuthGuard)
    foo(
        @Req() req: Request
    ) {
        // console.log(req.user)
        return {
            success: true,
            message: '',
            data: req.user
        }
    }
}