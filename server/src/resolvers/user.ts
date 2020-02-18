import {IResolvers} from "graphql-tools";
import * as bcrypt from "bcryptjs";
import {User} from "../entity/User";

export const resolvers: IResolvers = {
    Query: {
        me: (_, __, {user}) => {

            if (!user) {
                throw new Error("Access denied!");
            }
            return user;
        },

    },
    Mutation: {
        login: async (_, {email, password}) => {
            const user = await User.findOne({where: {email}});
            if (!user) {
                throw new Error("User not found!")
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error("Password does not match!");
            }
            return user.login();
        },
        register: async (_, {input}) => {
            return await User.NewUser(input)
        },

    }

};
