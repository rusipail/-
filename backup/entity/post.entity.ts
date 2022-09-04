import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from './user.entity'

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: string

    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    author: string

    @Column({nullable: false, type: 'text'})
    title: string

    @Column({nullable: false, type: 'text'})
    content: string

    @CreateDateColumn()
    registered_at: Date
}