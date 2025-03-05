<script setup lang="ts">
  import { ref, computed } from 'vue'

  const helyek = [
    {
      id:0,
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Hely1",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:1,
      url:"https://villany.hu/wp-content/gallery/vinatus-pince-es-fogado/vinatus-fogado-kivulrol.jpg",
      title:"Hely2",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:2,
      url:"https://kakas.hu/wp-content/uploads/2015/08/kakas_etterem.jpg",
      title:"Hely3",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:3,
      url:"https://upload.wikimedia.org/wikipedia/commons/6/63/Dr_Nagy_L%C3%A1szl%C3%B3_Gy%C3%B3gyped_Int_K%C5%91szeg.JPG",
      title:"Hely4",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:4,
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQXakdFgzJOpdxmf4ClbgANdmzb9pNvTXww&s",
      title:"Hely5",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:5,
      url:"https://mosthir.hu/wp-content/uploads/2023/08/spar-magyarorszag-bolt-860x459.jpg",
      title:"Hely7",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    }
  ]

const loading = ref(false)
const transitionState = ref(""); // Az animáció iránya

const window= ref(0)
const CurrentHely = computed(() => helyek[window.value]);

</script>

<template>
  <v-container fluid style="padding: 0px;">
    <v-window v-model="window" :show-arrows="$vuetify.display.mdAndUp">
      <v-window-item v-for="hely in helyek" :key="hely.id">
        <div class="homepage-container" :style="{ backgroundImage: `url(${CurrentHely.url})` }">
        <div class="content" :class="transitionState">
          <div class="text-section">
            <h1>{{ hely.title }}</h1>
            <div class="description-container">
              <p>{{ hely.description }}</p>
            </div>
            <v-card-text style="text-align: left;">
              <v-rating
                readonly
                :model-value="hely.rating"
                :length="5"
                size="large"
              ></v-rating>
            </v-card-text>
          </div>
          <div class="image-section">
            <img :src="hely.url" alt="Hely képe" />
          </div>
        </div>
      </div>
      </v-window-item>
    </v-window>

  <v-row style="padding: 16px;">
        <v-col v-for="hely in helyek" :key="hely.title" cols="12" sm="6" md="4" lg="2">
          <v-card
            rounded="xl"
            :disabled="loading"
            :loading="loading"
            class="mx-auto my-12">

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

.text-section h1{
  font-size: 40px;
  padding-bottom: 40px;
  text-align: left;
}

.text-section p{
  font-size: 20px;
  text-align: left;
}

.content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 2300px;
  padding: 40px;
  border-radius: 10px;
  flex-wrap: wrap; /* Engedélyezi a sorok törését */
  z-index: 2;
  box-sizing: border-box;
  margin: 0 60px;
  min-height: fit-content;
}

.homepage-container {
  width: 100%;
  min-height: 100%; /* A tartalom magasságához igazodik */
  height: 94vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 20px; /* Alsó padding a biztonság kedvéért */
  z-index: 0;
}

.homepage-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  pointer-events: none; /* Így nem akadályozza a kattintásokat */
}

/* Szöveges rész */
.text-section {
  flex: 1;
  color: white;
  text-align: left;
  margin: 0 20px;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.image-section img {
  width: 90%;
  border-radius: 10px;
}

@media (max-width: 1300px) {
  .content {
    flex-direction: column; /* Oszlopos elrendezés */
    align-items: center; /* Középre igazítás */
    min-height: fit-content; /* Dinamikus magasság a tartalom alapján */
  }

  .image-section {
    order: -1; /* A kép kerül előre */
    justify-content: center;
    width: 100%; /* Kép teljes szélességet kitölt */
  }

  .image-section img {
    margin-bottom: 20px; /* Hézag a kép alján */
    width: 100%; /* Kép méretének csökkentése kisebb képernyőn */
  }

  .text-section {
    text-align: center; /* Szöveg középre igazítása */
    margin: 0; /* Margók eltávolítása */
    width: 100%; /* Szöveg a teljes szélességhez igazodik */
  }

  .homepage-container
  {
    height: 100%;
  }
}

.content .v-card-text
{
  padding: 0px !important;
}

.description-container {
  max-height: 250px;
  overflow-y: auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  color: white;
}

</style>