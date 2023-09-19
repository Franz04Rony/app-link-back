import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Link {
    @PrimaryGeneratedColumn('uuid')
    idLink: string

    @Column('varchar',{
        nullable: false
    })
    image: string

    @Column('varchar',{
        nullable: false
    })
    label: string

    @Column('varchar',{
        nullable: false
    })
    link: string 
}
