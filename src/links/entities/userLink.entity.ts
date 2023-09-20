import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Link } from "./link.entity"
import { User } from "./user.entity"

@Entity()
export class userLink{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(
        ()=> Link,
        (link) => link.users
    )
    linkID: Link

    @ManyToOne(
        ()=> User,
        (user) => user.links
    )
    userID: User
}