import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profile } from '@/teacher.entity'
import {User} from '@/teacher.entity/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    ){}

    async saveUser(userData, profile){
        const user = new User()
        user.name = userData.name
        user.profile = profile
        return await this.userRepository.save(user)
    }

    async saveProfile(profileData){
        const profile = new Profile()
        profile.gender = profileData.gender
        profile.photo = profileData.photo
        try {
            return await this.profileRepository.save(profile)
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async getUsers(){
        return await this.userRepository.find()
    }

    async getUser(userId:string, isRelation:boolean = true){
        return await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
    }
}