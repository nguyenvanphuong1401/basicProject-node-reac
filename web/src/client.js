import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_URL } from './config'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-boost'

const httpLink = createHttpLink({
  uri: `${API_URL}/query`,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = localStorage.getItem('_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    httpLink,
  )),
  cache: new InMemoryCache(),
})