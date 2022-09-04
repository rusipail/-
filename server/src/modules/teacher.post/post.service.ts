import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profile, Post } from '@/teacher.entity'

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>
    ){}

    async savePost(data, user){
        const post = new Post()
        post.url = data.url
        post.user = user
        return await this.postRepository.save(post)
    }

    async getPost(postId:string){
        return await this.postRepository.findOne({
            where: {
                id: postId
            }
        })
    }

    async getPosts(){
        return await this.postRepository.find()
    }
}