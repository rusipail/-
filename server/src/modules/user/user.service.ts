import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDetail } from '@/interface'
import {UserEntity, UserStatus} from '@/entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ){}

    async saveUser(userData:UserDetail){
        const user = await this.userRepository.findOne({
            where: {
                email: userData.email
            }
        });

        console.log('찾았음!!')
        console.log(user)

        if(!user){
            const user = new UserEntity()
            user.name = userData.name;
            user.email = userData.email;
            user.picture = userData.picture;
            user.status = UserStatus.Login;
            return this.userRepository.save(user);
        }
        return null
    }

    async getUsers(){
        return await this.userRepository.find()
    }

    async getUser(userId:string){
        return await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
    }
}