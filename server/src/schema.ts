import {gql} from 'apollo-server-express'

export const schema = gql`
    enum Role{
        administrator
        authenticated
    }

    scalar Time
    scalar DateTime
    directive @hasRole(roles: [Role]) on FIELD_DEFINITION

    type Attachment{
        id: ID!
        name: String!
        originalName: String!
        contentType: String!
        size: Int!
        url: String!
        created: DateTime!
        user: User
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        roles: [String]!
        phone: String!
        created: DateTime!
    }

    type Token{
        id: String!
        user: User!
        expired: DateTime!
    }


    input NewPost{
        title: String!
    }

    input NewUser{
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        phone: String!
    }

    type Query {
        me: User! @hasRole(roles: [authenticated])
    }

    type Mutation {
        register(input: NewUser!): User!
        login(email: String!, password: String!): Token!
    }

`