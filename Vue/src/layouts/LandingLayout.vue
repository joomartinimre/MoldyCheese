<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();

const isActive = ref(false);
const placeName = ref('');
const description = ref('');
const imageFile = ref<File | null>(null);

const navigateTo = (path: string) => {
  router.push(path);
};

const handleLogout = () => {
  authStore.logout();
  navigateTo('/');
};

const items = [
  { title: "Iskolák", path: "/school" },
  { title: "Éttermek", path: "/restaurant" },
  { title: "Vegyesboltok", path: "/shop" },
  { title: "Játszóterek", path: "/playground" },
];

const { mobile } = useDisplay();

const search = ref(''); // Keresősáv értéke

// Visitor figyelmeztetés láthatóságának vezérlése
const showVisitor = ref(true);
const hideVisitor = () => {
  showVisitor.value = false;
};

interface Topic {
  id: number
  name: string
  tags: string[]
}

const topics: Topic[] = [
  {id: 1, name: 'Iskola', tags: ["Gimnázium", "Egyetem", "Általános Iskola", "Technikum", "Gyakorló Gimnázium", "+Kollégium", "Gyakorló Általános Iskola", "Kísérleti Gimnázium", "Kísérleti Általános Iskola"] },
  {id: 2, name: 'Étterem', tags: ["Csárda", "Fine Dining", "Ínyenc", "Panzió", "Borozó", "Bisztro", "Olasz", "Bár"] },
  {id: 3, name: 'Vegyesbolt', tags: ["Sarki Bolt", "Kis Bolt", "Szupermarket", "Díjnyertes", "Drogéria", "Szakbolt", "Elektronikai áruház", "Dohánybolt", "Online", "Bevásárlóközpont", "Könyvesbolt"] },
  {id: 4, name: 'Játszótér', tags: ["Ctype", "0-5 Év", "6-12 Év", "Csúszda", "Mászóka", "Homokozó", "Kültéri", "Beltéri", "Multifunkcionális", "Vízi Játszótér", "Biztonságos", "Kalandpark", "Zöldterület"] },
]

const roles = ['Étterem kritikus','Játszótér szakértő','Iskológus','Vegyesbolt vegyész']

const selectedTopic = ref<number | null>(null);
const selectedTags = ref<string[]>([]);
let realselectedTags = ref<string[]>([]);

const tagItems = computed(() => {
  const topic = topics.find(t => t.id === selectedTopic.value);
  return topic ? [...topic.tags] : [];
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    imageFile.value = target.files[0];
  }
};

const uploadPlace = async () => {
  if (!placeName.value || !description.value || !selectedTopic.value || !imageFile.value) {
    alert('Minden mező kitöltése kötelező!');
    return;
  }
  
  const formData = new FormData();
  formData.append('name', placeName.value);
  formData.append('text', description.value);
  formData.append('topic_ID', selectedTopic.value.toString());
  formData.append('tags', JSON.stringify(realselectedTags.value));
  formData.append('picture', imageFile.value);

  console.log("🔍 Küldött FormData adatok:");
formData.forEach((value, key) => {
  if (key === "tags") {
    console.log(`${key}:`, JSON.parse(value as string)); // Ha JSON string, akkor átalakítjuk
  } else {
    console.log(`${key}:`, value);
  }
});
  try {
    const response = await fetch('http://localhost:3000/api/place/create', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Hiba történt a feltöltés során');
    }
    alert('Hely sikeresen feltöltve!');
    refresh()
  } catch (error) {
    alert('Hiba történt a feltöltés során.');
    console.error(error);
  }
};
const selectedRole = ref('');

const sendRoleRequest = async () => {
  if (!description.value || !selectedRole.value) {
    alert('Minden mező kitöltése kötelező!');
    return;
  }

  const userId = authStore.user?.ID;
  if (!userId) {
    alert('Nem vagy bejelentkezve!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/request/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        reason: description.value,
        requested_role: selectedRole.value,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Hiba történt a jelentkezés során');
    }

    alert('Sikeresen jelentkeztél kritikusként!');
    isActive.value = false;
    description.value = '';
    selectedRole.value = '';
  } catch (error) {
    let errorMessage = 'Hiba történt a beküldés során.';

    // Ellenőrizzük, hogy a hiba egy objektum-e és van-e benne "message" kulcs
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = String(error.message);
    }

    alert(errorMessage);
    console.error('Beküldési hiba:', error);
  }
};

watch(selectedTopic, (newTopic) => {
  selectedTags.value = [];
  if (newTopic) {
    selectedTags.value = [...tagItems.value]; // Az alap tageket beállítja
  }
});

const toggleTag = (tag: string, event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  
  console.log(`🔍 Módosított tag: ${tag}`);
  console.log(`📌 Bejelölve? ${isChecked}`);
  
  if (isChecked) {
    if (!realselectedTags.value.includes(tag)) {
      realselectedTags.value.push(tag);
    }
  } else {
    realselectedTags.value = realselectedTags.value.filter(t => t !== tag);
  }

  console.log("🛠 Frissített selectedTags:", realselectedTags.value);
};
const fileUploadRef = ref<InstanceType<typeof import("vuetify/components")["VFileInput"]> | null>(null);

const refresh = ()=>{
    placeName.value = "";
  description.value = "";
  selectedTopic.value = null;
  selectedTags.value = [];
  realselectedTags.value = [];
  imageFile.value = null;

  if (fileUploadRef.value) {
    fileUploadRef.value.$forceUpdate;
  }
}
</script>

<template>
  <v-layout class="rounded rounded-md">
    <!-- 📌 FIXÁLT FEJLÉC -->
    <v-app-bar height="80" app class="sticky-header">
      <template v-slot:title>
        <div class="header-container">
          <button style="font-size: 25px;" @click="navigateTo('/')">
            🧀 <span v-if="!mobile">Moldy Cheese</span>
          </button>
          <v-text-field
            v-model="search"
            placeholder="Keresés..."
            variant="outlined"
            dense
            class="search-bar"
            hide-details
            clearable
          ></v-text-field>
        </div>
      </template>
      <div class="d-flex justify-space-around">
        <!-- Mobil nézet: account menü -->
        <v-menu transition="scale-transition" v-if="mobile">
          <template v-slot:activator="{ props }">
            <v-app-bar-nav-icon
              variant="elevated"
              color="primary"
              class="text-surface ma-1"
              v-bind="props"
            >
              <v-icon class="text-surface" v-if="authStore.isLoggedIn">mdi-account</v-icon>
              <v-icon class="text-surface" v-if="!authStore.isLoggedIn">mdi-login</v-icon>
            </v-app-bar-nav-icon>
          </template>
          <v-list>
            <template v-if="!authStore.isLoggedIn">
              <v-list-item>
                <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/login')">
                  Bejelentkezés
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/registration')">
                  Regisztráció
                </v-btn>
              </v-list-item>
            </template>
            <template v-else>
              <v-list-item>
                <v-btn variant="text" color="primary" class="ma-1" @click="handleLogout">
                  Kijelentkezés
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/profile')">
                  Profil
                </v-btn>
              </v-list-item>
              <v-list-item>
                  <v-dialog max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Jelentkezz kritikusnak!
                      </v-btn>
                    </template>

                    <template #default="{ isActive }">
                      <v-card>
                        <v-card-title>Kritikus űrlap</v-card-title>
                        <v-card-text>
                          <v-textarea v-model="description" label="Írja le miért lenne jó kritikus" variant="outlined" required></v-textarea>
                          <v-select
                            :items="roles"
                            v-model="selectedRole"
                            item-title="name"
                            item-value="id"
                            label="Válassza ki kritikusi szerepkörét"
                          ></v-select>
                        </v-card-text>
                        <v-card-actions style="padding: 24px;">
                          <v-btn variant="text" @click="sendRoleRequest">Űrlap elküldése</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn variant="text" @click="isActive.value = false">Bezárás</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
                <v-list-item>
                  <!-- Hely feltöltő modal -->
                  <v-dialog max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Új hely létrehozása
                      </v-btn>
                    </template>

                    <template #default="{ isActive }">
                      <v-card>
                        <v-card-title>Új hely létrehozása</v-card-title>
                        <v-card-text>
                          <v-text-field v-model="placeName" label="Adja meg a hely nevét" required></v-text-field>
                          <v-textarea v-model="description" label="Írjon egy leírást a helyről" variant="outlined" required></v-textarea>
                          <v-select
                            v-model="selectedTopic"
                            :items="topics"
                            item-title="name"
                            item-value="id"
                            label="Válassza ki milyen helyet szeretne létrehozni"
                          ></v-select>
                          <div v-if="selectedTopic">
                            <p>Válassza ki a hely jellemzőit</p>
                            <v-checkbox
                              v-for="tag in tagItems"
                              :key="tag"
                              :label="tag"
                              :value="tag"
                              @change="toggleTag(tag, $event)"
                              hide-details
                              variant="elevated" color="primary"
                            />
                          </div>
                        </v-card-text>
                        <v-file-upload title="Kép feltöltése" ref="fileUploadRef" @change="handleFileUpload" accept="image/*" clearable density="comfortable" variant="comfortable"><template #icon><v-icon variant="elevated" color="primary"></v-icon></template></v-file-upload>
                        <v-card-actions style="padding: 24px;">
                          <v-btn variant="text" @click="uploadPlace">Hely feltöltése</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn variant="text" @click="isActive.value = false">Bezárás</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
            </template>
          </v-list>
        </v-menu>

        <!-- Helyek menü -->
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-app-bar-nav-icon v-if="mobile" color="primary" v-bind="props"></v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo(item.path)">
                {{ item.title }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Asztali nézet: navigáció és account menü -->
      <nav v-if="!mobile" class="desktop-nav">
        <div class="desktop-nav-items">
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/school')">Iskolák</v-btn>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/restaurant')">Éttermek</v-btn>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/shop')">Vegyesboltok</v-btn>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/playground')">Játszóterek</v-btn>
        </div>
        <div class="desktop-nav-account">
          <v-menu transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-app-bar-nav-icon
                variant="elevated"
                color="primary"
                class="text-surface ma-1"
                v-bind="props"
              >
              <v-icon class="text-surface" v-if="authStore.isLoggedIn">mdi-account</v-icon>
              <v-icon class="text-surface" v-if="!authStore.isLoggedIn">mdi-login</v-icon>
              </v-app-bar-nav-icon>
            </template>
            <v-list>
              <template v-if="!authStore.isLoggedIn">
                <v-list-item>
                  <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/login')">
                    Bejelentkezés
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/registration')">
                    Regisztráció
                  </v-btn>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item>
                  <v-btn variant="text" color="primary" class="ma-1" @click="handleLogout">
                    Kijelentkezés
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/profile')">
                    Profil
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <!-- Hely feltöltő modal -->
                  <v-dialog max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Új hely létrehozása
                      </v-btn>
                    </template>

                    <template #default="{ isActive }">
                      <v-card>
                        <v-card-title>Új hely létrehozása</v-card-title>
                        <v-card-text>
                          <v-text-field v-model="placeName" label="Adja meg a hely nevét" required></v-text-field>
                          <v-textarea v-model="description" label="Írjon egy leírást a helyről" variant="outlined" required></v-textarea>
                          <v-select
                            v-model="selectedTopic"
                            :items="topics"
                            item-title="name"
                            item-value="id"
                            label="Válassza ki milyen helyet szeretne létrehozni"
                          ></v-select>
                          <div v-if="selectedTopic">
                            <p>Válassza ki a hely jellemzőit</p>
                            <v-checkbox
                              v-for="tag in tagItems"
                              :key="tag"
                              :label="tag"
                              :value="tag"
                              @change="toggleTag(tag, $event)"
                              hide-details
                              variant="elevated" color="primary"
                            />
                          </div>
                        </v-card-text>
                        <v-file-upload title="Kép feltöltése" ref="fileUploadRef" @change="handleFileUpload" accept="image/*" clearable density="comfortable" variant="comfortable"><template #icon><v-icon variant="elevated" color="primary"></v-icon></template></v-file-upload>
                        <v-card-actions style="padding: 24px;">
                          <v-btn variant="text" @click="uploadPlace">Hely feltöltése</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn variant="text" @click="isActive.value = false">Bezárás</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
                <v-list-item>
                  <v-dialog max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Jelentkezz kritikusnak!
                      </v-btn>
                    </template>

                    <template #default="{ isActive }">
                      <v-card>
                        <v-card-title>Kritikus űrlap</v-card-title>
                        <v-card-text>
                          <v-textarea v-model="description" label="Írja le miért lenne jó kritikus" variant="outlined" required></v-textarea>
                          <v-select
                            :items="roles"
                            item-title="name"
                            item-value="id"
                            label="Válassza ki kritikusi szerepkörét"
                          ></v-select>
                        </v-card-text>
                        <v-card-actions style="padding: 24px;">
                          <v-btn variant="text">Űrlap elküldése</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn variant="text" @click="isActive.value = false">Bezárás</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </div>
      </nav>
    </v-app-bar>

    <!-- 📌 A FŐ TARTALOM KÖZÉPRE IGAZÍTVA -->
    <div class="page-content">
      <v-container fluid class="main-container">
        <router-view />
      </v-container>
    </div>

    <!-- Visitor figyelmeztetés, X gombbal -->
    <v-container>
      <div class="visitor-container" v-if="showVisitor && !authStore.isLoggedIn && !['/login', '/registration'].includes(route.path)">
        <button class="close-btn" @click="hideVisitor" aria-label="Bezárás">×</button>
        <div class="visitor">
          <strong>Kedves Látogató!</strong> Tudtad, hogy nem vagy bejelentkezve?
          <v-btn variant="elevated" color="primary" class="text-surface ma-1" @click="navigateTo('/login')">
            Bejelentkezés
          </v-btn>
        </div>
      </div>
    </v-container>

    <!-- LÁBLÉC -->
    <v-navigation-drawer location="bottom" :mobile="false">
      <v-footer class="bg-yellow-darken-1">
        <v-row justify="center" no-gutters>
          <v-btn @click="navigateTo('/')" class="mx-2" color="primary" variant="text">Főoldal</v-btn>
          <v-btn @click="navigateTo('/aboutUs')" class="mx-2" color="primary" variant="text">Rólunk</v-btn>
          <v-dialog max-width="700px">
              <template #activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" color="primary" variant="text">
                  Jelentkezz kritikusnak!
                </v-btn>
              </template>

              <template #default="{ isActive }">
                <v-card>
                  <v-card-title>Kritikus űrlap</v-card-title>
                  <v-card-text>
                    <v-textarea v-model="description" label="Írja le miért lenne jó kritikus" variant="outlined" required></v-textarea>
                    <v-select
                      :items="roles"
                      item-title="name"
                      item-value="id"
                      label="Válassza ki kritikusi szerepkörét"
                    ></v-select>
                  </v-card-text>
                  <v-card-actions style="padding: 24px;">
                    <v-btn variant="text">Űrlap elküldése</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="isActive.value = false">Bezárás</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
        </v-row>
      </v-footer>
    </v-navigation-drawer>
  </v-layout>
</template>

<style scoped>
.sticky-header {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.page-content {
  padding-top: 64px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-container {
  width: 100vw;
  max-width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
}

.header-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-bar {
  max-width: 600px;
  width: 100%;
}

::v-deep(.search-bar .v-field__input) {
  font-size: 18px !important;
}

.v-btn--size-default {
  padding: 0 4px !important;
}

.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.v-navigation-drawer {
  height: auto !important;
}

/* Visitor üzenet konténer és stílusok */
.visitor-container {
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 80%;
  z-index: 1050;
}

.visitor {
  text-align: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  transition: opacity 0.15s linear;
  color: rgb(109,76,65);
  background-color: rgb(253,216,53);
  border: 1px solid rgb(109,76,65);
}

/* Bezáró X gomb stílusa */
.close-btn {
  position: absolute;
  top: -20px;
  right: -18px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: left;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgb(253,216,53);
  background-color: rgb(109,76,65);
  border-radius: 100%;
}
</style>
