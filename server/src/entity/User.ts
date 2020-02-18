import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, BeforeInsert} from "typeorm";
import {IsEmail} from "class-validator";
import moment from 'moment';
import {Token} from "../interfaces/Token";
import {jwtSign} from "../auth";
import * as bcrypt from "bcryptjs";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Index('email_idx', {unique: true})
    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "timestamp",
    })
    created: Date;


    @Column({
        type: 'json',
    })
    roles: string[];


    /**
     * Check if user is administrator
     */
    public isAdministrator(): boolean {
        return this.roles.includes("administrator");
    }

    public isSupperAdmin(): boolean {
        return this.roles.includes("supperadmin");
    }

    login(): Token {
        const expired = moment().add('14', 'day');
        return {
            id: jwtSign(this.id, expired.unix()),
            expired: expired.toDate(),
            user: this,
        }
    }

    public static async NewUser(input: any) {
        const {firstName, lastName, email, phone, password} = input;
        const obj = new User();
        const hashedPassword = await bcrypt.hash(password, 10);
        obj.lastName = lastName;
        obj.firstName = firstName;
        obj.email = email;
        obj.password = hashedPassword;
        obj.phone = phone;
        obj.roles = ["authenticated"];
        await obj.save();
        if (obj.id === 1) {
            obj.roles = ['administrator', 'authenticated'];
            await obj.save()
        }
        return obj;

    }

    @BeforeInsert()
    beforeInsert(){
        if(!this.created){
            this.created = new Date()
        }
    }


}
