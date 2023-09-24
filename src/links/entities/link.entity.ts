import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UserLink } from "./userLink.entity";

@Entity()
export class Link {
    @PrimaryGeneratedColumn('uuid')
    idLink: string

    @Column('varchar')
    image: string

    @Column('varchar')
    label: string

    @Column('varchar')
    link: string

    @OneToOne(
        ()=> UserLink,
        (user) => user.idLink
    )
    user : UserLink
}
