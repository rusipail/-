import {Post} from './post.entity'
import { Comment } from './comment.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email:string

    @Column()
    picture: string

    @CreateDateColumn()
    registered_at: Date

    @Column({
        enum: ['가입', '탈퇴']
    })
    status: '가입'|'탈퇴'

    @Column({
        enum:['general' , 'vip']
    })
    type: 'general' | 'vip'

    @OneToMany(() => Post, post => post.author)
    @JoinColumn()
    posts: Post[]

    @OneToMany(() => Comment, comment => comment.user_id)
    @JoinColumn()
    comments: Comment[]
}