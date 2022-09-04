import { User } from "@/interface"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    gender: string

    @Column()
    photo: string
}