import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Link } from "./link.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    userID: string

    @Column({
        type: 'varchar',
        unique: true,
    })
    name: string

    @Column('varchar')
    perfilImage: string

    @OneToMany(
        ()=> Link,
        (link) => link.user,
        { cascade: true }
    )
    links : Link[]
}