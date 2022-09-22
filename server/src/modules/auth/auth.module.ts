import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './google-oauth2.strategy'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from '../jwt/jwt.strategy'
import { config } from '../../../config'

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
        JwtModule.register({
            secret: config.JWT_SECRET,
            signOptions: { expiresIn: '30d' }
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        GoogleStrategy,
    ],
    exports: [],
})
export class AuthModule { }