import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { userLink } from "./userLink.entity";

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
        ()=> userLink,
        (userlink) => userlink.userID,
        { cascade: true }
    )
    links : userLink    
}