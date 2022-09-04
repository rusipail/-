import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {User} from './user.entity'
import { Comment } from './comment.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    author: User
    
    @Column()
    title:string

    @Column()
    content:string

    @CreateDateColumn()
    registered_at:Date

    @OneToMany( () => Comment, (comment) => comment.post_id)
    @JoinColumn()
    comments: Comment[]
}