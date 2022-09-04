import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import {User} from '@/teacher.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    url: string

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User
}