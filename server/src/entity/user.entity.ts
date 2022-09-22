import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Repository } from "typeorm";

export enum UserStatus {
    Login = 'login',
    Logout = 'logout'
}

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text')
    name: string

    @Column()
    email: string

    @Column('text')
    picture: string

    @CreateDateColumn()
    registered_at: Date

    @Column('text')
    status: UserStatus
}