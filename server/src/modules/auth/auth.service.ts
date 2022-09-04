import { UserDetail } from '@/interface'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../teacher.user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async tokenValidateUser(payload: UserDetail & { iat: number, exp: number }) {
        return await this.userService.getUser(payload.id)
    }

    async createToken(user: UserDetail) {
        return this.jwtService.sign(user, { expiresIn: '30d' })
    }
}