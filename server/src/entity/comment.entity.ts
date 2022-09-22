import { UserEntity } from '@/entity/user.entity'
import { Post } from '@/entity/post.entity'
import { join } from 'path'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Comment{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    content: string

    @CreateDateColumn()
    registered_at: Date

    @CreateDateColumn()
    update_at:Date

    @ManyToOne(() => UserEntity, (user)=> user.id)
    @JoinColumn()
    user_id: UserEntity

    @ManyToOne(() => Post, (post)=> post.id)
    @JoinColumn()
    post_id: UserEntity
}