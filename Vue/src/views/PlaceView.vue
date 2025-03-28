<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, reactive, computed, onMounted, Comment, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

axios.defaults.baseURL = "http://localhost:3000"

const authStore = useAuthStore()

interface Comment {
  author: string;
  role: string;
  time: string;
  avatar: string;
  content: string;
}

interface Place {
  id: number;
  name: string;
  description: string;
  tags: string[];
  Picture: string | null;
  rating: number;
  Comments: any[];
}
const comments = ref<Comment[]>([]);

const placeData = ref<any>(null);

const fetchPlace = async () => {
  if (placeID.value !== null) {
    try {
      const response = await axios.get(`/api/placedetail/${placeID.value}`);
      const data = response.data;

      placeData.value = {
        id: data.id,
        name: data.name,
        description: data.description ?? "Nincs leírás megadva.",
        tags: (() => {
          try {
            const parsed = JSON.parse(data.tags);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })(),
        Picture: data.url, // ez most már egy teljes URL, nem base64
        rating: data.rating ?? 0,
        Comments: data.Comments
      };

      comments.value = data.Comments.map((c: any) => ({
        author: c.User?.userName || "Ismeretlen",
        role: c.User?.role || "Ismeretlen",
        time: new Date(c.createdAt).toLocaleString("hu-HU"),
        avatar: c.User?.ID
        ? `http://localhost:3000/api/user/image/${c.User.ID}`
        : "http://localhost:3000/api/user/image/defaultPP.jpg",
        content: c.text
      }));
    } catch (error) {
      console.error("Hiba a hely betöltésekor:", error);
    }
  }
}

onMounted(() => {
  fetchPlace();
  console.log(placeData)
  console.log(comments)
  
})



// Dropdown opciók
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



const selected1 = ref(items1.value[0]?.title || 'Dropdown 1')
const selected2 = ref(items2.value[0]?.title || 'Dropdown 2')
const selected3 = ref(items3.value[0]?.title || 'Dropdown 3')

const route = useRoute()
const placeID = computed(() => route.params?.id ? Number(route.params.id) : null)

// Példa helyek


const selectedPlace = computed(() => placeData.value);


const form = reactive({
  place_ID: placeID.value,
  text: ""
})

const userID = computed(() => authStore.user?.ID || (authStore.user as any)?.ID)

// Kommentek tömbje – kezdetben statikus lista

// Komment beküldését végző függvény
const submitComment = async () => {
  
  if (form.place_ID === null) {
    alert("Hiba: Nem található érvényes hely ID.");
    return;
  }
  if (!authStore.user) {
    alert("Kérlek, jelentkezz be a kommenteléshez!");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/comment/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_ID: userID.value,  
        place_ID: form.place_ID,
        text: form.text
      })
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Hiba: ${error.error}`);
      return;
    }

    form.text = "";
    await fetchPlace(); // friss komment lista lekérdezése
  } catch (err) {
    console.error('Hiba történt a komment beküldése során:', err);
    alert('Nem sikerült csatlakozni a szerverhez.');
  }
};

watch(() => route.params.id, () => {
  fetchPlace()
})

// Értékelés beküldését végző függvény
const createRating = async () => {
  if (form.place_ID === null) {
    alert("Hiba: Nem található érvényes hely ID.");
    return;
  }
  if (!authStore.user) {
    alert("Kérlek, jelentkezz be az értékeléshez!");
    return;
  }
  
  // Kinyerjük a számot a selected2 értékéből, pl. "(3) Elégedett" -> 3
  const ratingMatch = selected2.value.match(/\((\d+)\)/);
  if (!ratingMatch) {
    alert("Hiba: Érvénytelen értékelési érték.");
    return;
  }
  const ratingValue = Number(ratingMatch[1]);
  console.log(userID.value,
        form.place_ID,
         ratingValue)
  try {
    const response = await fetch('http://localhost:3000/api/rating/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_ID: userID.value,
        place_ID: form.place_ID,
        rating: ratingValue
      })
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Hiba: ${error.error}`);
      return;
    }

    const data = await response.json();
    console.log(`Sikeres értékelés beküldés: ${data.message}`);
  } catch (err) {
    console.error('Hiba történt az értékelés beküldése során:', err);
    alert('Nem sikerült csatlakozni a szerverhez.');
  }
};

// Külön függvény, ami beállítja a selected2 értéket és azonnal elküldi az értékelést
const handleRatingSelection = (ratingTitle: string) => {
  selected2.value = ratingTitle;
  createRating();
};


</script>

<template>
  <v-container fluid v-if="placeData">
    <div class="homepage-container" :style="{ backgroundImage: `url(${placeData.Picture})` }">
      <div class="content">
        <div class="image-section">
          <img :src="placeData.Picture" alt="Hely képe" />
        </div>
        <div class="text-section">
          <div class="title-rating">
            <h1>{{ placeData.name }}</h1>
            <div class="place-types">
              <span v-for="(type, index) in placeData.tags" :key="index" class="type-box">
                {{ type }}
              </span>
            </div>
            <!-- Dropdown gombok -->
            <div class="dropdown-buttons" style="display: flex; gap: 10px; margin: 10px 0;">
              <v-menu offset-y>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="primary" style="border: 1px solid rgb(253,216,53);">
                    {{ selected1 }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in items1" :key="'menu1-' + index" @click="selected1 = item.title">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu offset-y>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="primary" style="border: 1px solid rgb(253,216,53);">
                    {{ selected2 }}
                  </v-btn>
                </template>
                <v-list>
                  <!-- Az itt lévő click esemény beállítja az értéket, majd meghívja a createRating-t -->
                  <v-list-item 
                    v-for="(item, index) in items2" 
                    :key="'menu2-' + index" 
                    @click="handleRatingSelection(item.title)"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu offset-y>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="primary" style="border: 1px solid rgb(253,216,53);">
                    {{ selected3 }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in items3" :key="'menu3-' + index" @click="selected3 = item.title">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <v-card-text style="text-align: left;">
              <v-rating hover half-increments :model-value="selectedPlace.rating" :length="10" size="large" active-color="elevated text-surface"></v-rating>
            </v-card-text>
          </div>
          <div class="description-container">
            <p>{{ placeData.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Kommentek szekció -->
    <div class="comments">
      <h5 class="comments-title">Hozzászólások / Reakciók</h5>
      <div class="comments-divider"></div>
      <div class="comments-list">
        <div v-for="(comment, index) in comments" :key="index" class="comment-item">
          <img :src="comment.avatar" alt="Profilkép" class="comment-avatar">
          <div class="comment-bubble">
            <div class="bubble-header">
              <span class="comment-author">
                {{ comment.author }}
                <small style="color: gray;">({{ comment.role }})</small>
              </span>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <div class="bubble-content">
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Komment beküldő űrlap -->
      <form @submit.prevent="submitComment" class="comment-form">
        <textarea v-model="form.text" placeholder="Írd meg a hozzászólásodat..." rows="8"></textarea>
        <p>
          Hozzászólásban más látogatók, az oldal kritikusainak sértegetése vagy más weboldalak hirdetése tilos.
          Az ilyen hozzászólásokat töröljük, és a hozzászólási lehetőségedet letiltjuk.
          Ha úgy gondolod, hogy egy üzenetedet tévedésből tiltottuk le, kérjük, jelezd nekünk mihamarabb az xy menüpontban (soon), és utánanézünk.
          <span style="color: gold">Köszönjük a megértést!</span>
        </p>
        <button type="submit">Küldés</button>
      </form>
    </div>
  </v-container>
  <v-container v-else class="not-found">
      <h2>Nincs ilyen hely!</h2>
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
  margin: 0 60px;
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

@media (max-width: 1300px) {
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
    width: 100%;
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
  margin-bottom: 10px;
  text-align: left;
}

/* Vastagabb elválasztó csak a címsor alatt */
.comments-divider {
  width: 50%;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
}

.comments-list {
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
}

/* Komment item: avatar és szövegbuborék */
.comment-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

.comment-avatar {
  width: 50px; /* kicsit nagyobb, mint korábban */
  height: 50px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Szövegbuborék stílus */
.comment-bubble {
  background: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
  position: relative;
  flex: 1;
}

/* Buborék kis nyíl */
.comment-bubble::before {
  content: "";
  position: absolute;
  top: 15px;
  left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent #f1f1f1 transparent transparent;
}

/* Buborék fejléc: felhasználónév és dátum */
.bubble-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.bubble-header .comment-author {
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.bubble-header .comment-time {
  font-size: 0.85rem;
  color: #777;
}

.bubble-content p {
  margin: 0;
  line-height: 1.4;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

/* Komment beküldő űrlap stílusai */
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
