<script setup lang="ts">
  import { ref, computed } from 'vue'

  const helyek = [
    {
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Hely1",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://villany.hu/wp-content/gallery/vinatus-pince-es-fogado/vinatus-fogado-kivulrol.jpg",
      title:"Hely2",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://kakas.hu/wp-content/uploads/2015/08/kakas_etterem.jpg",
      title:"Hely3",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://upload.wikimedia.org/wikipedia/commons/6/63/Dr_Nagy_L%C3%A1szl%C3%B3_Gy%C3%B3gyped_Int_K%C5%91szeg.JPG",
      title:"Hely4",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQXakdFgzJOpdxmf4ClbgANdmzb9pNvTXww&s",
      title:"Hely5",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"data:image/jpeg;base64,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",
      title:"Hely6",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://mosthir.hu/wp-content/uploads/2023/08/spar-magyarorszag-bolt-860x459.jpg",
      title:"Hely7",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    }
  ]

  const loading = ref(false)
  const selection = ref(1)
  function reserve () {
    loading.value = true
    setTimeout(() => (loading.value = false), 2000)
  }

  const activeIndex = ref(0);
const transitionState = ref(""); // Az animáció iránya

const randomHely = computed(() => helyek[activeIndex.value]);

const nextSlide = () => {
  transitionState.value = "exiting-left";
  setTimeout(() => {
    activeIndex.value = (activeIndex.value + 1) % helyek.length;
    transitionState.value = "entering";
  }, 500); // Animáció időtartama
};

const prevSlide = () => {
  transitionState.value = "exiting-right";
  setTimeout(() => {
    activeIndex.value = (activeIndex.value - 1 + helyek.length) % helyek.length;
    transitionState.value = "entering";
  }, 500); // Animáció időtartama
};

</script>

<template>
  <v-container fluid>
    
    <div
      class="homepage-container"
      :style="{ backgroundImage: `url(${randomHely.url})` }"
    >
      <!-- Bal oldali nyíl -->
      <button class="arrow-button left-arrow" @click="prevSlide">
        ◀
      </button>

      <!-- Tartalom -->
      <div class="content" :class="transitionState">
        <div class="text-section">
          <h1>{{ randomHely.title }}</h1>
          <p>{{ randomHely.description }}</p>
          <v-card-text style="text-align: left;">
            <v-rating
              readonly
              :model-value="randomHely.rating"
              :length="5"
              size="large"
            ></v-rating>
          </v-card-text>
        </div>
        <div class="image-section">
          <img :src="randomHely.url" alt="Hely képe" />
        </div>
      </div>

      <!-- Jobb oldali nyíl -->
      <button class="arrow-button right-arrow" @click="nextSlide">
        ▶
      </button>
    </div>

  <v-row>
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
  width: 100%;
  max-width: 2300px;
  padding: 20px;
  border-radius: 10px;
  flex-wrap: wrap; /* Engedélyezi a sorok törését */
  z-index: 2;
  box-sizing: border-box;
  margin: 0 90px;
  min-height: fit-content;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
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
}

.homepage-container::before {
  content: '';
  position: absolute; /* Az egész konténert lefedi */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Fekete opacitásos réteg */
  z-index: 1; /* Háttérként marad a tartalom alatt */
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

@media (max-width: 1600px) {
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
    width: 80%; /* Kép méretének csökkentése kisebb képernyőn */
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

.arrow-button {
  position: absolute;
  top: 50%; /* Gomb középre helyezése függőlegesen */
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5); 
  color: black;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 3;
}

.arrow-button:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.left-arrow {
  left: 20px; /* Marad az eredeti helyen */
}

.right-arrow {
  right: 20px; /* Marad az eredeti helyen */
}

.content.exiting-left {
  transform: translateX(-100%);
  opacity: 0;
}

.content.exiting-right {
  transform: translateX(100%);
  opacity: 0;
}

.content.entering {
  transform: translateX(0);
  opacity: 1;
}

.content .v-card-text
{
  padding: 0px !important;
}

</style>