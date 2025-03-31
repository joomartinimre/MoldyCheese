<script lang="ts" setup>
import { ref, onMounted  } from 'vue';
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
const keptoltes = ref(true);
const defaultProfilePictureUrl = `http://localhost:3000/api/user/image/defaultPP.jpg`;
const profilePictureUrl = ref(defaultProfilePictureUrl);

const authStore = useAuthStore();

const fetchProfileData = async () => {
  try {
    const { data } = await axios.get(`/api/profile/${authStore.user?.ID}`);
    userName.value = data.userName;
    console.log("👉 Betöltött userName:", data.userName);

    profileInfo.value[0].value = userName.value;
    profileInfo.value[1].value = data.email;
    profileInfo.value[2].value = data.role;
    profileInfo.value[3].value = data.commentCount;
    profileInfo.value[4].value = data.ratingCount;
    profileInfo.value[5].value = data.totalCommentLikes;
    profilePictureUrl.value = data.profilePictureUrl || defaultProfilePictureUrl;

    topComments.value = data.topComments.map((c: any) => ({
      author: c.User.userName,
      role: c.User.role,
      time: new Date(c.createdAt).toLocaleString("hu-HU"),
      avatar: c.User?.ID
        ? `http://localhost:3000/api/user/image/${c.User.ID}`
        : defaultProfilePictureUrl,
      content: c.text,
      liked: false,
      likeCount: c.likeCount,
      isEditing: false
    }));
  } catch (err) {
    console.error("❌ Hiba a profiladatok lekérésekor:", err);
  }
};

onMounted(() => {
  fetchProfileData();
});



const profileImageFile = ref<File | null>(null);

const handleProfilePictureUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    profileImageFile.value = target.files[0];
  }
};

const uploadProfilePicture = async () => {
  if (!profileImageFile.value) {
    alert("Kérlek, válassz ki egy képet!");
    return;
  }

  const formData = new FormData();
  formData.append("picture", profileImageFile.value);
  formData.append("user_ID", String(authStore.user?.ID));

  try {
    await axios.post("/api/profile/picture", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    alert("✅ Profilkép frissítve!");
    fetchProfileData(); 
  } catch (error) {
    console.error("❌ Hiba a profilkép frissítésénél:", error);
  }
};


const kepNezet = () => {
  keptoltes.value = true;
}

const topNezet = () => {
  keptoltes.value = false;
}

interface Comment {
  author: string;
  role: string;
  time: string;
  avatar: string;
  content: string;
  liked: boolean;
  likeCount: number;
  isEditing: boolean;
}


const topComments = ref<Comment[]>([
 
]);

const atnevezie = ref(false);

const userName = ref('User')
const userNameEdit = ref(userName.value)

const profileInfo = ref([
  { label: "Megjelenítendő név:", value: userName, gomb:'van'},
  { label: "Email:", value: "mark.ballon0507@gmail.com" },
  { label: "Jogosultság:", value: "User" },
  { label: "Hozzászólásaim száma:", value: "152" },
  { label: "Értékeléseim száma:", value: "15" },
  { label: "Hozzászólásaimra kapott likeok száma:", value: "1253" },
]);

const userNameUpdate = () => {
  userNameEdit.value = userName.value;
  atnevezie.value = true;
};

const userNameSave = async () => {
  console.log(userNameEdit.value) 
  try {
    if(userNameEdit.value.length > 6){

    
    await axios.put('/api/profile/username', {
      user_ID: authStore.user?.ID,
      newUserName: userNameEdit.value
    });
    userName.value = userNameEdit.value;
    profileInfo.value[0].value = userName.value;
    atnevezie.value = false;
  }
  else{
    alert("A felhasználónév legalább legyen 7 karakter hosszú!")
  }
  } catch (err) {
    console.error("❌ Hiba a név módosításakor:", err);
  }
  
};



const userNameCancel = () => {
  userNameEdit.value = userName.value;
  atnevezie.value = false;
};

</script>

<template>
  <v-container fluid class="pa-0" style="max-width: 1300px; margin: 50px;">
    <v-card class="mx-auto pa-4" outlined>
      <v-row>
        <v-col cols="12" sm="4" class="d-flex justify-center" style="align-items: center; object-fit: cover;">
          <v-img
            :src="profilePictureUrl"
            width="320"
            height="320"
            class="rounded"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="8">
          <v-card-title class="text-h4">Üdvözöllek, {{ userName }}!</v-card-title>
          <v-card-text>
            <v-row dense class="mb-2" v-for="(item, index) in profileInfo" :key="index">
              <v-col cols="6">
                {{ item.label }}
              </v-col>
              <v-col cols="6">
                <template v-if="item.gomb">
                  <div v-if="!atnevezie" style="display: flex; gap: 10px; align-items: center;">
                    <p>{{ item.value }}</p>
                    <v-btn size="small" color="primary" class="text-surface" @click="userNameUpdate">Módosítás</v-btn>
                  </div>
                  <div v-if="atnevezie" style="display: flex; gap: 10px;">
                    <textarea v-model="userNameEdit" style="resize: none;" maxlength="20" rows="1">{{ item.value }}</textarea>
                    <v-btn size="small" color="primary" class="text-surface" @click="userNameSave">Mentés</v-btn>
                    <v-btn size="small" color="primary" class="text-surface" @click="userNameCancel">Mégse</v-btn>
                  </div>
                </template>
                <template v-else>
                  {{ item.value }}
                </template>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <v-row justify="center" dense>
      <v-col cols="auto" class="text-center">
        <v-btn variant="elevated" color="primary" class="text-surface ma-2" @click="kepNezet">Profilkép módosítása</v-btn>
        <v-btn variant="elevated" color="primary" class="text-surface ma-2" @click="topNezet">Top 3 kommentjeim</v-btn>
      </v-col>
    </v-row>

    <v-card v-if="keptoltes" class="mx-auto pa-4" outlined>
      <v-card-title class="text-h5">Itt töltsd fel a profilképed:</v-card-title>
      <div style="max-width: 350px; margin-left: auto; margin-right: auto;">
        <v-file-upload
        ref="fileUploadRef"
        @change="handleProfilePictureUpload" 
        accept="image/*"
        clearable
        density="comfortable"
        variant="comfortable"
      >
        <template #icon>
          <v-icon variant="elevated" color="primary"></v-icon>
        </template>
      </v-file-upload>     </div>
        <v-card-actions style="justify-content: flex-start;">
          <v-btn variant="elevated" color="primary" class="text-surface"  @click="uploadProfilePicture">Feltöltés</v-btn>
        </v-card-actions>
    </v-card>

    <v-card v-if="!keptoltes" class="mx-auto pa-4 bg-transparent" outlined>
      <v-card-title class="text-h5">A legtöbbet likeolt 3 hozzászólásod:</v-card-title>
      <div class="comments-list">
        <div v-for="(comment, index) in topComments" :key="index" class="comment-item">
          <img :src="comment.avatar" alt="Profilkép" class="comment-avatar">
          <div class="comment-bubble bg-yellow-lighten-3">
            <div class="bubble-header">
              <span class="comment-author">
                {{ comment.author }}
                <small style="color: gray;">({{ comment.role }})</small>
              </span>
              <span class="comment-time">
                {{ comment.time }}
              </span>
            </div>
            <div class="bubble-content">
              <p>{{ comment.content }}</p>
            </div>
            <div style="display: flex; align-items: center;">
              <v-icon style="width: 30px;" variant="text" size="small">mdi-thumb-up</v-icon>
              <p>{{ comment.likeCount  }}</p>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.comments-list {
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
}

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
  width: 50px; 
  height: 50px;
  border-radius: 50%;
  flex-shrink: 0;
}

.comment-bubble {
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
  position: relative;
  flex: 1;
}

.comment-bubble::before {
  content: "";
  position: absolute;
  top: 15px;
  left: -18px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent #fff59d transparent transparent;
}

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

textarea {
  resize: none; 
  border-bottom: 1px solid #000;
  outline: none;
}

textarea:focus {
  border-bottom: 2px solid #000;
}

.v-card-text div {
  font-size:medium
}

</style>
