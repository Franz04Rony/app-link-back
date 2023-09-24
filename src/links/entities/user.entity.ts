import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserLink } from "./userLink.entity";


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
        ()=> UserLink,
        (link) => link.userID,
        { cascade: true }
    )
     link : UserLink
}