import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {UserEntity} from './user.entity'
import { Comment } from './comment.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn()
    author: UserEntity
    
    @Column()
    title:string

    @Column()
    content:string

    @CreateDateColumn()
    registered_at:Date
}