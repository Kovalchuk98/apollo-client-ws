import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split
} from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import {
  DefaultApolloClient,
  provideApolloClient
} from '@vue/apollo-composable'

export const ApolloPlugin =() => {
  const httpLink = createHttpLink({
    uri: 'https://graphql.bubble.chat:8081/',
    credentials: 'include'
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'wss://graphql.bubble.chat:8081/'
    })
  )

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    ssrMode: false,
    link,
    cache
  })

  

  provideApolloClient(apolloClient)
}
