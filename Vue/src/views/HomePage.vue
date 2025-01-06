<script setup lang="ts">
  import { ref } from 'vue'

  const helyek = [
    {
      url:"https://cdn.vuetifyjs.com/images/cards/cooking.png",
      title:"Cím",
      rating:4
    },
    {
      url:"https://cdn.vuetifyjs.com/images/cards/cooking.png",
      title:"Cím",
      rating:4
    },
    {
      url:"https://cdn.vuetifyjs.com/images/cards/cooking.png",
      title:"Cím",
      rating:4
    },
    {
      url:"https://cdn.vuetifyjs.com/images/cards/cooking.png",
      title:"Cím",
      rating:4
    },
    {
      url:"https://cdn.vuetifyjs.com/images/cards/cooking.png",
      title:"Cím",
      rating:4
    },
    {
      url:"https://cdn.vuetifyjs.com/images/cards/cooking.png",
      title:"Cím",
      rating:4
    },
    {
      url:"https://cdn.vuetifyjs.com/images/cards/cooking.png",
      title:"Cím",
      rating:4
    },
    {
      url:"https://cdn.vuetifyjs.com/images/cards/cooking.png",
      title:"Cím",
      rating:4
    }
  ]

  const loading = ref(false)
  const selection = ref(1)
  function reserve () {
    loading.value = true
    setTimeout(() => (loading.value = false), 2000)
  }
</script>

<template>
  <v-container fluid>
  <v-row>
    <v-col cols="6">
      <v-card-item>
        <v-card-title style="font-size: large;">{{ helyek[0].title }}</v-card-title>
      </v-card-item>
    </v-col>
    <v-col cols="6">
      <v-card-item>
        <v-card-title>{{ helyek[0].url }}</v-card-title>
      </v-card-item>
    </v-col>
  </v-row>
  <v-row>
        <v-col v-for="hely in helyek" :key="hely.title" cols="12" sm="6" md="4" lg="2">
          <v-card
            rounded="xl"
            :disabled="loading"
            :loading="loading"
            class="mx-auto my-12"
            max-width="200">

            <v-img
              height="250"
              :src="hely.url"
              cover
            ></v-img>

            <v-card-item>
              <v-card-title>{{ hely.title }}</v-card-title>
            </v-card-item>

            <v-card-text>
              <v-rating
              readonly
                :model-value="hely.rating"
                :length="5"
                size="">
              </v-rating>
            </v-card-text>

          </v-card>
        </v-col>
  </v-row>
</v-container>

</template>