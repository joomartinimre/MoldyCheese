<script setup lang="ts">
  import { ref, computed } from 'vue'

  const helyek = [
    {
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Ckik",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Ckik",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Ckik",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Ckik",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Ckik",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Ckik",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Ckik",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Ckik",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
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
    <!-- Bal oldali nyíl -->
    <button class="arrow-button left-arrow">
          ◀
        </button>
      <div class="content">
      <div class="text-section">
        <h1>{{ randomHely.title }}</h1>
        <p>{{ randomHely.description }}</p>
        <v-card-text style="text-align: left;">
          <v-rating
          readonly
            :model-value="randomHely.rating"
            :length="5"
            size="large">
          </v-rating>
        </v-card-text>
      </div>
      <div class="image-section">
        <img :src="randomHely.url" alt="Hely képe" />
      </div>
    </div>
    <button class="arrow-button right-arrow">
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

.homepage-container {
  width: 100%;
  height: 94vh; /* Teljes nézetablak magassága */
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
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

.content {
  position: relative; /* A tartalom fölé kerül a háttér */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 2300px; /* Maximális szélesség */
  padding: 20px;
  border-radius: 10px;
  flex-wrap: wrap; /* Engedélyezi a törést */
  height: auto; /* Dinamikus magasság */
  z-index: 2; /* A tartalom a háttér fölött helyezkedik el */
  box-sizing: border-box;
  margin: 0 90px;
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
  }

  .image-section {
    order: -1; /* A kép kerül előre */
    justify-content: center; /* Kép középre igazítása */
    width: 100%; /* Kép teljes szélességet kitölt */
  }

  .image-section img {
    margin-bottom: 20px; /* Hézag a kép alján */
    width: 80%; /* Kép méretének csökkentése kisebb képernyőn */
  }

  .text-section {
    text-align: center; /* Szöveg középre igazítása */
    margin: 0; /* Margók eltávolítása */
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

</style>