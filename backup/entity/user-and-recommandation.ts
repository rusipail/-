import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {User} from './user.entity'

@Entity('user-and-recommandation')
export class UserNRecommandation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne((type) => User, (user) => user.id)
    @JoinColumn()
    from: string

    @OneToOne((type) => User, (user) => user.id)
    @JoinColumn()
    to: string
}