<script setup lang="ts">
  import { ref, computed } from 'vue'

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

  const randomHely = computed(() => helyek[Math.floor(Math.random() * helyek.length)]);

  const loading = ref(false)
  const selection = ref(1)
  function reserve () {
    loading.value = true
    setTimeout(() => (loading.value = false), 2000)
  }
</script>

<template>
  <v-container fluid>
    <div class="homepage-container" :style="{ backgroundImage: `url(${randomHely.url})` }">
    <div class="content">
      <div class="text-section">
        <h1>{{ randomHely.title }}</h1>
        <p>{{ randomHely.rating }}</p>
      </div>
      <div class="image-section">
        <img :src="randomHely.url" alt="Hely képe" />
      </div>
    </div>
  </div>
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

<style scoped>
.homepage-container {
  width: 100%;
  height: 90vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.text-section {
  flex: 1;
  color: white;
  text-align: left;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.image-section img {
  width: 50%;
  border-radius: 10px;
}
</style>