<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, reactive, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useDisplay } from 'vuetify'

axios.defaults.baseURL = "http://localhost:3000"

const authStore = useAuthStore()

interface Comment {
  id: number;
  author: string;
  role: string;
  time: string;
  avatar: string;
  content: string;
  liked: boolean;
  likeCount: number;
  isEditing: boolean;
  originalContent?: string;
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
      user_ratenumberL : data.user_ratenumberL ?? 0,
      user_ratenumberC : data.user_ratenumberC ?? 0,
      topic_id: data.topic_id,
      user_rate: data.user_rate ?? 0,
      critic_rate: data.critic_rate ?? 0,
      visits: data.visits ?? 0,
      likes: data.likes ?? 0,
      createdAt: data.createdAt ?? null,
      Comments: data.Comments
};

      
      comments.value = data.Comments.map((c: any) => ({
        
      id: c.ID,
      author: c.User?.userName || "Ismeretlen",
      role: c.User?.role || "Ismeretlen",
      time: new Date(c.createdAt).toLocaleString("hu-HU"),
      avatar: c.User?.ID
        ? `http://localhost:3000/api/user/image/${c.User.ID}`
        : "http://localhost:3000/api/user/image/defaultPP.jpg",
      content: c.text,
      liked: false,           // alapértelmezett állapot
      likeCount: c.likes || 0,  // ha van adat, akkor abból, különben 0
      isEditing: false        // új mező, mely jelzi, hogy a komment szerkesztés alatt áll-e
    }));
    } catch (error) {
      console.error("Hiba a hely betöltésekor:", error);
    }
  }
}

const checkIfUserLikedPlace = async () => {
  try {
    const response = await axios.get(`/api/p/placelike/${authStore.user?.ID}/${placeID.value}`);

    globalLiked.value = response.data.liked;
    globalLikes.value = placeData.value.likes;
  } catch (error) {
    console.error("Hiba a place-like lekérdezésnél:", error);
  }
};






const route = useRoute()
const placeID = computed(() => route.params?.id ? Number(route.params.id) : null)


const selectedPlace = computed(() => placeData.value);


const form = reactive({
  place_ID: placeID.value,
  text: ""
})


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
        user_ID:authStore.user.ID,  
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
    await fetchPlace();
    await checkUserCommentLikes(); 
  } catch (err) {
    console.error('Hiba történt a komment beküldése során:', err);
    alert('Nem sikerült csatlakozni a szerverhez.');
  }
};

watch(() => route.params.id, () => {
  fetchPlace()
})

const ertekeles = ref(null);

const Ertekel = (newValue : any) => {
  ertekeles.value = newValue;
  console.log(newValue);

  createRating();
}

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

  const userID = authStore.user.ID; // 🟢 Itt deklaráljuk

  if (ertekeles.value === null) {
    alert("Kérlek, válassz értékelést!");
    return;
  }

  const ratingValue = ertekeles.value;

  console.log(userID, form.place_ID, ratingValue); // ✅ Most már biztonságos

  try {
    const response = await fetch('http://localhost:3000/api/rating/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_ID: userID,
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




const megjegyzestIr = ref(false)

const { mobile } = useDisplay();



const globalLiked = ref(false);
const globalLikes = ref(0);

const toggleGlobalLike = async () => {
  if (!authStore.user) {
    alert("Kérlek, jelentkezz be a like-oláshoz!");
    return;
  }

  try {
    if (!globalLiked.value) {
      await axios.post(`/api/p/placelike`, {
        user_ID: authStore.user.ID,
        place_ID: placeID.value
      });
      globalLikes.value++;
      globalLiked.value = true;
    } else {
      await axios.post(`/api/p/placelike`, {
        user_ID: authStore.user.ID,
        place_ID: placeID.value
      });
      globalLikes.value--;
      globalLiked.value = false;
    }
  } catch (error) {
    console.error("Hiba a place-like művelet közben:", error);
  }
};

const checkUserCommentLikes = async () => {
  try {
    const response = await axios.get(`/api/c/commentlike/user/${authStore.user?.ID}`);
    const likedCommentIDs = response.data.map((like: any) => like.comment_ID);

    console.log("✔️ LIKE-OLT COMMENTEK:", likedCommentIDs);

    comments.value = comments.value.map(comment => ({
      ...comment,
      liked: likedCommentIDs.includes(Number(comment.id)) // TÍPUS-EGYEZTETÉS!
    }));
  } catch (error) {
    console.error("Hiba a comment-like állapot lekérdezésekor:", error);
  }
};




const toggleCommentLike = async (comment: any) => {
  if (!authStore.user) {
    alert("Kérlek, jelentkezz be a like-oláshoz!");
    return;
  }

  try {
    if (!comment.liked) {
      await axios.post(`/api/c/commentlike`, {
        user_ID: authStore.user.ID,
        comment_ID: comment.id
      });
      comment.likeCount++;
      comment.liked = true;
    } else {
      await axios.post(`/api/c/commentlike`, {
        user_ID: authStore.user.ID,
        comment_ID: comment.id
      });
      comment.likeCount--;
      comment.liked = false;
    }
  } catch (error) {
    console.error("Hiba a comment-like művelet közben:", error);
  }
};


const editComment = (comment: Comment) => {
  comment.originalContent = comment.content;
  comment.isEditing = true;
};

const saveEditComment = async (comment: Comment) => {
  console.log(comment)
  try {
    const response = await axios.put(`/api/comment/comment/update/${comment.id}`, {
      text: comment.content,
    });
    console.log(comment)
    comment.content = response.data.text; // backend válaszból frissítjük
    comment.originalContent = comment.content;
    comment.isEditing = false;
  } catch (error) {
    console.error('Hiba a komment mentésekor:', error);
    // opcionálisan vissza lehet állítani az eredetit hiba esetén:
    comment.content = comment.originalContent || comment.content;
    comment.isEditing = false;
  }
};

const deleteComment = async (comment: Comment) => {
  console.log(comment)
  try {
    const response = await axios.delete(`/api/comment/comment/${comment.id}`, {
      data: {
        user_ID: authStore.userId,
        role: authStore.userRole,
      },

    });
    await fetchPlace();
    await checkUserCommentLikes(); 
  } catch (error) {
    console.error('Hiba a komment mentésekor:', error);
  
  }
};



const cancelEditComment = (comment: Comment) => {
  comment.content = comment.originalContent || comment.content;
  comment.isEditing = false;
};


onMounted(async () => {
  await fetchPlace();

  authStore.addRecentPlace(Number(placeID.value));

  if (authStore.user) {
    await checkIfUserLikedPlace();
    await checkUserCommentLikes();
  }
});

</script>

<template>
  <v-container fluid v-if="placeData" style="padding: 0px;">
    <div class="homepage-container" :style="{ backgroundImage: `url(${placeData.Picture})` }">
      <div class="content">
        <div class="image-section">
          <img :src="placeData.Picture" alt="Hely képe" />
        </div>
        <div class="text-section">
          <h1>{{ placeData.name }}</h1>
          <div class="place-types">
            <span v-for="(type, index) in placeData.tags" :key="index" class="type-box">
              {{ type }}
            </span>
          </div>
          <div class="description-container">
            <p>{{ placeData.description }}</p>
          </div>
          <div style="padding-left: 10px; font-size: 17px;">
            {{placeData.createdAt}} |
            <v-icon size="small">mdi-eye</v-icon>  {{placeData.visits}} |
            <v-btn variant="text" size="small" :icon="globalLiked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'" @click="toggleGlobalLike" style="width: 20px;"></v-btn>
            {{ globalLikes }}
          </div>
          <v-card-text style="text-align: left;">
            <v-rating v-if="!mobile"
              @update:model-value="Ertekel"
              hover
              half-increments
              v-model="selectedPlace.rating"
              :length="10"
              size="large"
              active-color="elevated text-surface"
            ></v-rating>
            <v-rating v-if="mobile"
            hover
              half-increments
              @update:model-value="Ertekel"
              v-model="selectedPlace.rating"
              :length="10"
              :size="40"
              active-color="elevated text-surface"
            ></v-rating>
          </v-card-text>
        </div>
      </div>
    </div>
    <!-- Kommentek szekció -->
    <div class="comments">
      <h5 style="font-size: 2rem;">Hozzászólások</h5>
      <div class="comments-divider"></div>
      <div class="comments-list">
        <div v-for="(comment, index) in comments" :key="index" class="comment-item">
          <img :src="comment.avatar" alt="Profilkép" class="comment-avatar">
          <div class="comment-bubble bg-yellow-lighten-3">
            <div class="bubble-header">
              <span class="comment-author">
                {{ comment.author }}
                <small style="color: gray;">({{ comment.role }})</small>
              </span>
              <span class="comment-time">
                {{ comment.time }}
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-dots-vertical" size="" variant="text"></v-btn>
                  </template>
                  <v-list style="border-radius: 15px;">
                    <v-list-item style="padding: 0px;">
                      <v-btn variant="text" color="primary" @click="editComment(comment)">
                        <v-icon>mdi-pencil</v-icon>
                        Szerkesztés
                      </v-btn>
                    </v-list-item>
                    <v-list-item style="padding: 0px;">
                      <v-btn variant="text" color="primary" @click="deleteComment(comment)">
                        <v-icon>mdi-delete</v-icon>
                        Törlés
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </span>
            </div>
            <div class="bubble-content">
              <p v-if="!comment.isEditing">{{ comment.content }}</p>
              <textarea style="padding: 0px;" v-if="comment.isEditing" rows="1" v-model="comment.content"></textarea>
              <v-card-actions style="padding: 0px; min-height: 30px; justify-content: flex-end;">
                <div style="display: flex; align-items: center;">
                  <v-btn style="width: 30px;" variant="text" size="small" :icon="comment.liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'" @click="toggleCommentLike(comment)"></v-btn>
                  <p>{{ comment.likeCount  }}</p>
                </div>
                <v-spacer></v-spacer>
                <v-btn v-if="comment.isEditing" variant="text" size="small" @click="cancelEditComment(comment)">Mégse</v-btn>
                <v-btn v-if="comment.isEditing" variant="text" size="small" @click="saveEditComment(comment)">Mentés</v-btn>
              </v-card-actions>
            </div>
          </div>
        </div>
      </div>
      <!-- Komment beküldő űrlap -->
      <form @submit.prevent="submitComment" class="comment-form" style="margin-bottom: 20px;">
          <textarea @focus="megjegyzestIr = true" v-model="form.text" placeholder="Írj megjegyzést..." rows="1"></textarea>
          <v-card-actions v-if="megjegyzestIr" style="padding: 0px; min-height: 30px; justify-content: flex-end;">
            <v-btn variant="text" size="small" @click="megjegyzestIr = false">Mégse</v-btn>
            <v-btn variant="text" size="small" type="submit" :disabled="!form.text.trim()">Megjegyzés</v-btn>
          </v-card-actions>
        <p>
          Hozzászólásban más látogatók, az oldal kritikusainak sértegetése vagy más weboldalak hirdetése tilos.
          Az ilyen hozzászólásokat töröljük, és a hozzászólási lehetőségedet letiltjuk.
          Ha úgy gondolod, hogy egy üzenetedet tévedésből tiltottuk le, kérjük, jelezd a support csoportnak (hamarosan), és utánanézünk.
          <span class="bg-yellow-lighten-3" style="padding: 5px;">Köszönjük a megértést!</span>
        </p>
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
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.place-types {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.type-box {
  padding: 5px 10px;
  border: 1px solid white;
  border-radius: 5px;
  font-size: 18px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
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
}

.content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 2300px;
  padding: 50px;
  border-radius: 10px;
  flex-wrap: wrap;
  z-index: 2;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
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

  .text-section{
    margin: 0;
    width: 100%;
  }

  .homepage-container
  {
    height: 100%;
  }
}

.not-found {
  text-align: center;
  color: red;
  font-size: 24px;
  padding: 50px;
}

.comments {
  padding: 50px;
  max-width: 2300px;
  margin-left: auto;
  margin-right: auto;
}

/* Vastagabb elválasztó csak a címsor alatt */
.comments-divider {
  width: 100%;
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
  left: -18px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent #fff59d transparent transparent;
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
  margin-bottom: 10px;
  resize: none; 
  border-bottom: 1px solid #000;
  outline: none;
}

.comment-form textarea:focus {
  border-bottom: 2px solid #000;
}

.bubble-content textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  resize: none; 
  border-bottom: 1px solid #000;
  outline: none;
}

.bubble-content textarea:focus {
  border-bottom: 2px solid #000;
}

.content .v-card-text 
{
    padding: 0px !important;
}

</style>
