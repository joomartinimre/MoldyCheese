<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

// Külön opciók a három dropdownhoz
const items1 = ref([
  { title: 'Nem ismerem' },
  { title: 'Tervezek elmenni' },
  { title: 'Fontos!' },
  { title: 'Kedvencem' }
])
const items2 = ref([
  { title: '(0) Nincs értékelve' },
  { title: '(1) Szörnyű' },
  { title: '(2) Rossz' },
  { title: '(3) Elégedett' },
  { title: '(4) Remek' },
  { title: '(5) Kiváló' }
])
const items3 = ref([
  { title: 'Option 3A' },
  { title: 'Option 3B' },
  { title: 'Option 3C' }
])

// Reaktív változók a kiválasztott értékek tárolására
const selected1 = ref(items1.value[0]?.title || 'Dropdown 1')
const selected2 = ref(items2.value[0]?.title || 'Dropdown 2')
const selected3 = ref(items3.value[0]?.title || 'Dropdown 3')

const route = useRoute()

// Példa helyek (Ezt backendről is tölthetnéd később)
const helyek = ref([
  {
    id: 1,
    url: "https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
    title: "Hely1",
    rating: 4,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. orem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. orem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis.",
    types: ["Általános iskola", "1-8", "Alap ismeretek"]
  },
  {
    id: 2,
    url: "https://via.placeholder.com/600",
    title: "Hely2",
    rating: 5,
    description: "Ez egy másik hely leírása.",
    types: ["Típus1", "Típus2", "Típus3"]
  }
])

// Az URL-ből kinyert ID számként
const placeID = computed(() => Number(route.params.id))

// A kiválasztott hely megkeresése
const selectedPlace = computed(() => {
  return helyek.value.find(hely => hely.id === placeID.value)
})

// Kommentek tömbje, 5 azonos objektummal
const comments = ref([
  {
    author: "Felhasználónév",
    time: "2025.01.30 14:10:27",
    avatar: "https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/369807815_3611893209131278_1119172429369100096_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WNcBuA_pn14Q7kNvgH3Doio&_nc_oc=Adjq-abhhDfhpjgLEwV7ZDzbGu4EwCLZFIpK9uOtqTQGdRQgy0P2ZQ00iRIGenQ0GXH68-T57uO4xUvQjXeiiFPN&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AGA-gJi2BOiqZTS1VIreCnL&oh=00_AYCKMzVXOHdYRpuzf2zBpUN7xIih51GF1V71125y-tMIAA&oe=67BFF4D7",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis."
  },
  {
    author: "Felhasználónév",
    time: "2025.01.30 14:10:27",
    avatar: "https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/369807815_3611893209131278_1119172429369100096_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WNcBuA_pn14Q7kNvgH3Doio&_nc_oc=Adjq-abhhDfhpjgLEwV7ZDzbGu4EwCLZFIpK9uOtqTQGdRQgy0P2ZQ00iRIGenQ0GXH68-T57uO4xUvQjXeiiFPN&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AGA-gJi2BOiqZTS1VIreCnL&oh=00_AYCKMzVXOHdYRpuzf2zBpUN7xIih51GF1V71125y-tMIAA&oe=67BFF4D7",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis."
  },
  {
    author: "Felhasználónév",
    time: "2025.01.30 14:10:27",
    avatar: "https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/369807815_3611893209131278_1119172429369100096_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WNcBuA_pn14Q7kNvgH3Doio&_nc_oc=Adjq-abhhDfhpjgLEwV7ZDzbGu4EwCLZFIpK9uOtqTQGdRQgy0P2ZQ00iRIGenQ0GXH68-T57uO4xUvQjXeiiFPN&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AGA-gJi2BOiqZTS1VIreCnL&oh=00_AYCKMzVXOHdYRpuzf2zBpUN7xIih51GF1V71125y-tMIAA&oe=67BFF4D7",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis."
  },
  {
    author: "Felhasználónév",
    time: "2025.01.30 14:10:27",
    avatar: "https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/369807815_3611893209131278_1119172429369100096_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WNcBuA_pn14Q7kNvgH3Doio&_nc_oc=Adjq-abhhDfhpjgLEwV7ZDzbGu4EwCLZFIpK9uOtqTQGdRQgy0P2ZQ00iRIGenQ0GXH68-T57uO4xUvQjXeiiFPN&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AGA-gJi2BOiqZTS1VIreCnL&oh=00_AYCKMzVXOHdYRpuzf2zBpUN7xIih51GF1V71125y-tMIAA&oe=67BFF4D7",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis."
  },
  {
    author: "Felhasználónév",
    time: "2025.01.30 14:10:27",
    avatar: "https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/369807815_3611893209131278_1119172429369100096_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=WNcBuA_pn14Q7kNvgH3Doio&_nc_oc=Adjq-abhhDfhpjgLEwV7ZDzbGu4EwCLZFIpK9uOtqTQGdRQgy0P2ZQ00iRIGenQ0GXH68-T57uO4xUvQjXeiiFPN&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AGA-gJi2BOiqZTS1VIreCnL&oh=00_AYCKMzVXOHdYRpuzf2zBpUN7xIih51GF1V71125y-tMIAA&oe=67BFF4D7",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis."
  }
])
</script>

<template>
  <v-container fluid>
    <div
      v-if="selectedPlace"
      class="homepage-container"
      :style="{ backgroundImage: `url(${selectedPlace.url})` }"
    >
      <div class="content">
        <div class="image-section">
          <img :src="selectedPlace.url" alt="Hely képe" />
        </div>
        <div class="text-section">
          <div class="title-rating">
            <h1>{{ selectedPlace.title }}</h1>
            <div class="place-types">
              <span v-for="(type, index) in selectedPlace.types" :key="index" class="type-box">
                {{ type }}
              </span>
            </div>

            <!-- Három dropdown gomb, külön opciókkal -->
            <div class="dropdown-buttons" style="display: flex; gap: 10px; margin: 10px 0;">
              <!-- Dropdown 1 -->
              <v-menu offset-y>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="primary" style="border: 1px solid rgb(253,216,53);">
                    {{ selected1 }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items1"
                    :key="'menu1-' + index"
                    @click="selected1 = item.title"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!-- Dropdown 2 -->
              <v-menu offset-y>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="primary" style="border: 1px solid rgb(253,216,53);">
                    {{ selected2 }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items2"
                    :key="'menu2-' + index"
                    @click="selected2 = item.title"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!-- Dropdown 3 -->
              <v-menu offset-y>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="primary" style="border: 1px solid rgb(253,216,53);">
                    {{ selected3 }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items3"
                    :key="'menu3-' + index"
                    @click="selected3 = item.title"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <v-card-text style="text-align: left;">
              <v-rating readonly :model-value="selectedPlace.rating" :length="5" size="large"></v-rating>
            </v-card-text>
          </div>
          <div class="description-container">
            <p>{{ selectedPlace.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>Nincs ilyen hely!</h2>
    </div>

    <!-- Kommentek szekció -->
    <div class="comments">
      <!-- Kommentek címe -->
      <h5 class="comments-title">Hozzászólások / Reakciók</h5>

      <!-- Komment lista, a comments tömb alapján -->
      <div class="comments-list">
        <div v-for="(comment, index) in comments" :key="index" class="comment-item">
          <div class="comment-header">
            <img :src="comment.avatar" alt="Profilkép" class="comment-avatar">
            <div class="comment-meta">
              <a href="" class="comment-author">{{ comment.author }}</a>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
          </div>
          <div class="comment-content">
            <p>{{ comment.content }}</p>
          </div>
        </div>
      </div>

      <!-- Komment beküldő űrlap -->
      <div class="comment-form">
        <textarea placeholder="Írd meg a hozzászólásodat..." rows="8"></textarea>
        <p>
          Hozzászólásban más látogatók, az oldal kritikusainak sértegetése vagy más weboldalak hirdetése tilos.
          Az ilyen hozzászólásokat töröljük, és a hozzászólási lehetőségedet letiltjuk.
          Ha úgy gondolod, hogy egy üzenetedet tévedésből tiltottuk le, kérjük, jelezd nekünk mihamarabb az xy menüpontban (soon), és utánanézünk.
          <span style="color: gold">Köszönjük a megértést!</span>
        </p>
        <button type="submit">Küldés</button>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.text-section {
  flex: 1;
  color: white;
  text-align: left;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title-rating {
  display: flex;
  flex-direction: column;
}

.place-types {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.type-box {
  padding: 5px 10px;
  border: 1px solid white;
  border-radius: 5px;
  font-size: 18px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
}

.text-section h1 {
  font-size: 40px;
  padding-bottom: 10px;
  text-align: left;
}

.description-container {
  max-height: 250px;
  overflow-y: auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  color: white;
}

.text-section p {
  font-size: 20px;
  text-align: left;
  margin-bottom: 20px;
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
  flex-wrap: wrap;
  z-index: 2;
  box-sizing: border-box;
  margin: 0 90px;
  min-height: fit-content;
}

.homepage-container {
  width: 100%;
  min-height: 100vh;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.image-section img {
  width: 90%;
  border-radius: 10px;
}

@media (max-width: 1600px) {
  .content {
    flex-direction: column;
    align-items: center;
    min-height: fit-content;
  }

  .image-section {
    order: -1;
    justify-content: center;
    width: 100%;
  }

  .image-section img {
    margin-bottom: 20px;
    width: 80%;
  }

  .text-section {
    text-align: center;
    margin: 0;
    width: 100%;
  }
}

.not-found {
  text-align: center;
  color: red;
  font-size: 24px;
  padding: 50px;
}

.comments {
  width: 100%;
  margin: 20px 0 30px;
  padding: 15px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.comments-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
}

.comments-list {
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
}

.comment-item {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.comment-meta {
  margin-left: 10px;
}

.comment-author {
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.comment-author:hover {
  text-decoration: underline;
}

.comment-time {
  display: block;
  font-size: 0.85rem;
  color: #777;
}

.comment-content p {
  margin: 0;
  line-height: 1.4;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

.comment-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.comment-form textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.comment-form button {
  align-self: flex-start;
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #337ab7;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #286090;
}

.content .v-card-text 
{
    padding: 0px !important;
}

</style>
