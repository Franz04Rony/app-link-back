import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Link, User } from "./";
import { IsString } from "class-validator";

@Entity()
export class UserLink{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    userRef: string

    @Column()
    idRef: string
    
    @ManyToOne(
        ()=> User,
        (user) => user.link
    )
    userID : User

    @OneToOne(
        () => Link,
        (link) => link.user
    )
    idLink : Link
}