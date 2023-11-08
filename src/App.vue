<script setup lang="ts">
import { watch } from "vue"
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useSubscription } from "@vue/apollo-composable"

const { result } = useQuery(gql`
      query Visitors {
        visitors {
          id
        }
      }
    `)

const { result: newMessege } = useSubscription(gql`
      subscription onMessageAdded {
        messageNew {
        id
        text
        dialog {
          id
          visitor {
            id
          }
          }
        }
      }
    `)

  watch(
      newMessege,
      data => {
        console.log("New message received:", data.messageNew)
      },
      // {
      //   lazy: true // Don't immediately execute handler
      // }
    )



</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      Apollo client  
    </div>
  </header>
  <div>
    {{ result?.visitors }}
  </div>
  <div>
    new message block  <br>{{ newMessege?.messageNew }}
  </div>
  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
