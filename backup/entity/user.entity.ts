import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({nullable: false, type: 'text'})
    name: string

    @Column({nullable: false, type: 'text'})
    email: string

    @Column({type: 'text'})
    picuture: string

    @CreateDateColumn()
    registered_at: Date

    @Column({default: '가입'})
    status: '가입' | '탈퇴'

    @Column({default: 'general'})
    type: 'general' | 'vip'
}