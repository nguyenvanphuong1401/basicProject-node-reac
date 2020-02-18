import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, ManyToOne, JoinColumn} from "typeorm";
import {User} from "./User";

@Entity()
@Index(['name'])
export class Attachment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    originalName: string;

    @Column()
    contentType: string;

    @Column()
    size: number;

    @Column({
        type: "timestamp",
        nullable: true
    })
    created: Date;
    //Do not add @Column
    url: string;

    @ManyToOne(() => User, {nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinColumn()
    author: User;

}
