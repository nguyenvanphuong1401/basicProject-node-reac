import {resolvers as userResolvers} from "./user";

import {merge} from 'lodash'

export const resolvers = merge(
    userResolvers,
);