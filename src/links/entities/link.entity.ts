import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { userLink } from "./userLink.entity";

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

    @OneToMany(
        ()=> userLink,
        (userlink) => userlink.linkID,
        { cascade: true }
    )
    users : userLink
}
