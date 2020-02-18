import {User} from "../entity/User";

export interface Token {
    user: User
    id: string
    expired: Date
}