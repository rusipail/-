import {Injectable} from '@nestjs/common'
import { UserCustomRepository } from './user.repository';
import {User} from '@/teacher.entity/user.entity'
import {Profile} from '@/teacher.entity/profile.entity'

import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ){}
}