<script lang="ts" setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000"

const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();
const applyDialogHeader = ref(false);
const applyDialogFooter = ref(false);
const isInnerDialogOpen = ref(false);
const newPlaceDialog = ref(false);
const roleManagerDialog = ref(false);
const applicationsDialogHeader = ref(false);
const applicationsDialogFooter = ref(false);

const resetAllDialogData = () => {
  description.value = '';
  selectedRole.value = '';
  placeName.value = '';
  selectedTopic.value = null;
  selectedTags.value = [];
  realselectedTags.value = [];
  imageFile.value = null;
};

const dialogRefs = [
  applyDialogHeader,
  applyDialogFooter,
  isInnerDialogOpen,
  newPlaceDialog,
  roleManagerDialog,
  applicationsDialogFooter,
  applicationsDialogHeader,
];

dialogRefs.forEach(dialogRef => {
  watch(dialogRef, (newVal, oldVal) => {
    if (oldVal === true && newVal === false) {
      resetAllDialogData();
    }
  });
});


interface RoleUser {
  ID: number;
  userName: string;
  role: string;
}

const allUsers = ref<RoleUser[]>([]);
const isActive = ref(false);
const placeName = ref('');
const description = ref('');
const imageFile = ref<File | null>(null);

const navigateTo = (path: string) => {
  router.push(path);
};

const fetchAllUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/role/all');
    if (!response.ok) throw new Error('Nem sikerült lekérni a felhasználókat.');
    allUsers.value = await response.json();
  } catch (error) {
    console.error('Hiba a felhasználók lekérésekor:', error);
  }
};

const promoteToAdmin = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/role/promote/${userId}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Nem sikerült adminná tenni a felhasználót.');
    await fetchAllUsers();
  } catch (error) {
    console.error('Hiba az admin jog adásakor:', error);
  }
};

const demoteToUser = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/role/demote/${userId}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Nem sikerült elvenni a jogot.');
    await fetchAllUsers();
  } catch (error) {
    console.error('Hiba a jog elvételkor:', error);
  }
};

const handleLogout = () => {
  authStore.logout();
  navigateTo('/');
};

const helyek = [
  { title: "Iskolák", path: "/school" },
  { title: "Éttermek", path: "/restaurant" },
  { title: "Vegyesboltok", path: "/shop" },
  { title: "Játszóterek", path: "/playground" },
];

const { mobile } = useDisplay();

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
  console.log( description.value+ " és " + selectedRole.value) 
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
      applyDialogHeader.value = false; 
      applyDialogFooter.value = false; 
      throw new Error(responseData.error || 'Hiba történt a jelentkezés során');
    }

    alert('Sikeresen jelentkeztél kritikusként!');
    applyDialogHeader.value = false; 
    applyDialogFooter.value = false; 
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



const pendingRequests = ref<any[]>([]);
const selectedRequest = ref<any | null>(null);

const fetchPendingRequests = async () => {
  
  try {
    const response = await fetch('http://localhost:3000/api/request/request/pending');
    if (!response.ok) {
      throw new Error('Nem sikerült lekérni a függőben lévő kérelmeket.');
    }
    pendingRequests.value = await response.json();
  } catch (error) {
    console.error('Hiba a kérelmek lekérésekor:', error);
  }
};

const openRequestModal = (request: any) => {
  selectedRequest.value = request;
  isInnerDialogOpen.value = true;
};

const approveRequest = async (requestId: number) => {
  try {
    const response = await fetch('http://localhost:3000/api/request/request/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request_id: requestId, admin_id: authStore.user?.ID }),
    });
    if (!response.ok) {
      throw new Error('Hiba történt a kérelem elfogadása közben.');
    }
    alert('A kérelem sikeresen elfogadva!');
    fetchPendingRequests();
    isInnerDialogOpen.value = false;
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

const denyRequest = async (requestId: number) => {
  try {
    const response = await fetch('http://localhost:3000/api/request/request/deny', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request_id: requestId, admin_id: authStore.user?.ID }),
    });
    if (!response.ok) {
      throw new Error('Hiba történt a kérelem elutasítása közben.');
    }
    alert('A kérelem elutasítva!');
    fetchPendingRequests();
    isInnerDialogOpen.value = false;
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

onMounted(() => {
  fetchPendingRequests();
  fetchAllUsers();
});

const search = ref('')
const searchResults = ref<any[]>([]);

watch(search, async (newSearch) => {
  if (newSearch.length >= 2) {
    try {
      const response = await axios.get(`/api/search/${newSearch}`);
      console.log("🔍 Keresési találatok:", response.data); // 💥 EZ KELL
      searchResults.value = response.data;
    } catch (error) {
      console.error("❌ Hiba a keresés közben:", error);
    }
  } else {
    searchResults.value = [];
  }
});

const goToPlace = (id: number) => {
  console.log(id)
  router.push(`/place/${id}`);
};

const searchContainer = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target as Node)) {
    searchResults.value = [];
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
  <v-layout class="rounded rounded-md">
    <!-- 📌 FIXÁLT FEJLÉC -->
    <v-app-bar height="80" style="position: fixed !important;">
      <template v-slot:title>
        <div class="header-container">
          <button style="font-size: 25px;" @click="navigateTo('/')">
            🧀 <span v-if="!mobile">Moldy Cheese</span>
          </button>
          <!-- Csak a keresőmező -->
          <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
            max-width="500"
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
              <v-list-item v-if="authStore.userRole == 'User'">
                  <v-dialog v-model="applyDialogHeader" max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Jelentkezz kritikusnak!
                      </v-btn>
                    </template>

                    <template #default="{ isActive }">
                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
                      <v-card>
                        <v-card-title>Kritikus űrlap</v-card-title>
                        <v-card-text>
                          <v-textarea v-model="description" label="Írja le miért lenne jó kritikus" variant="outlined" required></v-textarea>
                          <v-select
                            v-model="selectedRole"
                            :items="roles"
                            item-title="name"
                            item-value="id"
                            label="Válassza ki kritikusi szerepkörét"
                            hide-details
                          ></v-select>
                        </v-card-text>
                        <v-card-actions style="padding: 24px; justify-content: flex-start;">
                          <v-btn variant="elevated" color="primary" class="text-surface" @click="sendRoleRequest">Űrlap elküldése</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
                <v-list-item v-if="authStore.userRole == 'Admin'">
                  <!-- Hely feltöltő modal -->
                  <v-dialog v-model="newPlaceDialog" max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Új hely létrehozása
                      </v-btn>
                    </template>

                    <template #default="{ isActive }">
                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
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
                            hide-details
                          ></v-select>
                          <div v-if="selectedTopic">
                            <h4 style="padding: 10px;">Válassza ki a hely jellemzőit</h4>
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
                        <v-card-actions style="padding: 24px; justify-content: flex-start;">
                          <v-btn variant="elevated" color="primary" class="text-surface" @click="uploadPlace">Hely feltöltése</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
                <v-list-item v-if="authStore.userRole == 'Admin'">
                  <v-dialog v-model="applicationsDialogHeader" max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <div class="jelentkezesek">{{ pendingRequests.length }}</div>
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Jelentkezések
                      </v-btn>
                    </template>
                    
                    <template #default="{ isActive }">
                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
                      <v-card>
                        <v-card-title>Kritikusi jelentkező űrlapok</v-card-title>
                        
                          <v-card-text>
                          <div v-if="pendingRequests.length === 0" class="text-center">
                              <p>Nincs függőben lévő kérelem</p>
                            </div>
                          <v-table v-else>
                            <thead>
                              <tr>
                                <th class="text-left">
                                <h3>Felhasználónév</h3>
                                </th>
                                <th class="text-right">
                                  <h3>Űrlapok</h3>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="request in pendingRequests" :key="request.id">
                                <td class="text-left">{{ request.User ? request.User.userName : 'N/A' }}</td>
                                <td class="text-right">
                                  
                                  <!-- Belső jelentkezési modal -->
                                  <v-dialog  v-model="isInnerDialogOpen" max-width="700px">
                                    <template #activator="{ props: activatorProps }">
                                      <v-btn v-bind="activatorProps" variant="elevated" color="primary"  class="text-surface" @click="openRequestModal(request)">
                                        Űrlap megtekintése
                                      </v-btn>
                                    </template>
                                    
                                    <template #default="{ isActive }">
                                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
                                      <v-card  v-if="selectedRequest">
                                        <v-card-title>{{selectedRequest.User.userName}} űrlapja</v-card-title>
                                        <v-card-text>
                                          <div>
                                            <h4>Indoklás</h4>
                                            <p style="padding-left: 20px; padding-right: 20px;">{{ selectedRequest.reason }}</p>
                                          </div>
                                          <br>
                                          <div>
                                            <h4>Szerepköre:</h4>
                                            <p>{{ selectedRequest.requested_role }}</p>
                                          </div>
                                        </v-card-text>
                                        <v-card-actions style="padding: 24px; justify-content: flex-start;">
                                          <v-btn variant="elevated" color="warning" class="text-surface" @click="denyRequest(selectedRequest.id)">Elutasítás</v-btn>
                                          <v-spacer></v-spacer>
                                          <v-btn variant="elevated" color="success" class="text-surface" @click="approveRequest(selectedRequest.id)">Elfogadás</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </template>
                                  </v-dialog>
                                </td>
                              </tr>
                            </tbody>
                          </v-table>
                        </v-card-text>
                      </v-card>
                    </template>
                    <!-- jog kezelés modal 1-->
                  </v-dialog>
                </v-list-item>
                <v-list-item v-if="authStore.userRole == 'Admin'">
                  <v-dialog v-model="roleManagerDialog" max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Jogok kezelése
                      </v-btn>
                    </template>
                    
                    <template #default="{ isActive }">
                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
                      <v-card>
                        <v-card-title>Jogok kezelése</v-card-title>
                        <v-card-text>
                          <div v-if="allUsers.length === 0" class="text-center">
                            <p>Nincsenek felhasználók</p>
                          </div>

                          <v-table v-else>
                            <thead>
                              <tr>
                                <th class="text-left">
                                <h3>Felhasználónév</h3>
                                </th>
                                <th class="text-center">
                                <h3>Jog</h3>
                                </th>
                                <th class="text-right">
                                  <h3>Jogok kezelése</h3>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="user in allUsers" :key="user.ID">
                                <td class="text-left text-h6">{{ user.userName }}</td>
                                <td class="text-center text-h6">{{ user.role }}</td>
                                <td class="text-right" style="padding: 10px;">
                                  <v-btn  @click="promoteToAdmin(user.ID)" width="150px" variant="elevated" color="success" class="text-surface">Admin jog adás</v-btn>
                                  <v-spacer style="margin: 10px !important;"></v-spacer>
                                  <v-btn @click="demoteToUser(user.ID)" width="150px" variant="elevated" color="warning" class="text-surface">Jog elvétele</v-btn>
                                </td>
                              </tr>
                            </tbody>
                          </v-table>
                        </v-card-text>
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
            <v-list-item v-for="(hely, i) in helyek" :key="i">
              <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo(hely.path)">
                {{ hely.title }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Asztali nézet: navigáció és account menü -->
      <nav v-if="!mobile" class="desktop-nav">
        <div>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/school')">Iskolák</v-btn>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/restaurant')">Éttermek</v-btn>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/shop')">Vegyesboltok</v-btn>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/playground')">Játszóterek</v-btn>
        </div>
        <div>
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
                  <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/profile')">
                    Profil
                  </v-btn>
                </v-list-item>
                <v-list-item v-if="authStore.userRole == 'Admin'">
                  <v-dialog v-model="applicationsDialogHeader" max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <div class="jelentkezesek">{{ pendingRequests.length }}</div>
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Jelentkezések
                      </v-btn>
                    </template>
                    
                    <template #default="{ isActive }">
                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
                      <v-card>
                        <v-card-title>Kritikusi jelentkező űrlapok</v-card-title>
                        <v-card-text>
                          <div v-if="pendingRequests.length === 0" class="text-center">
                              <p>Nincs függőben lévő kérelem</p>
                            </div>
                          <v-table v-else>
                            <thead>
                              <tr>
                                <th class="text-left">
                                <h3>Felhasználónév</h3>
                                </th>
                                <th class="text-right">
                                  <h3>Űrlap</h3>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="request in pendingRequests" :key="request.id">
                                <td class="text-left">{{ request.User ? request.User.userName : 'N/A' }}</td>
                                <td class="text-right">
                                  
                                  <!-- Belső jelentkezési modal -->
                                  <v-dialog v-model="isInnerDialogOpen" max-width="700px">
                                    <template #activator="{ props: activatorProps }">
                                      <v-btn v-bind="activatorProps" variant="elevated" color="primary"  class="text-surface" @click="openRequestModal(request)">
                                        Űrlap megtekintése
                                      </v-btn>
                                    </template>
                                    
                                    <template #default="{ isActive }">
                                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
                                      <v-card  v-if="selectedRequest">
                                        <v-card-title>{{selectedRequest.User.userName}} űrlapja</v-card-title>
                                        <v-card-text>
                                          <div>
                                            <h4>Indoklás</h4>
                                            <p style="padding-left: 20px; padding-right: 20px;">{{ selectedRequest.reason }}</p>
                                          </div>
                                          <br>
                                          <div>
                                            <h4>Szerepköre:</h4>
                                            <p>{{ selectedRequest.requested_role }}</p>
                                          </div>
                                        </v-card-text>
                                        <v-card-actions style="padding: 24px; justify-content: flex-start;">
                                          <v-btn variant="elevated" color="warning" class="text-surface" @click="denyRequest(selectedRequest.id)">Elutasítás</v-btn>
                                          <v-spacer></v-spacer>
                                          <v-btn variant="elevated" color="success" class="text-surface" @click="approveRequest(selectedRequest.id)">Elfogadás</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </template>
                                  </v-dialog>
                                </td>
                              </tr>
                            </tbody>
                          </v-table>
                        </v-card-text>
                      </v-card>
                    </template>
                    <!-- jog kezelés modal 2-->
                  </v-dialog>
                </v-list-item>
                <v-list-item v-if="authStore.userRole == 'Admin'">
                  <!-- Hely feltöltő modal -->
                  <v-dialog v-model="newPlaceDialog" max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Új hely létrehozása
                      </v-btn>
                    </template>

                    <template #default="{ isActive }">
                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
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
                            hide-details
                          ></v-select>
                          <div v-if="selectedTopic">
                            <h4 style="padding: 10px;">Válassza ki a hely jellemzőit</h4>
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
                        <v-card-actions style="padding: 24px; justify-content: flex-start;">
                          <v-btn variant="elevated" color="primary" class="text-surface" @click="uploadPlace">Hely feltöltése</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
                <v-list-item v-if="authStore.userRole == 'User'">
                  <v-dialog v-model="applyDialogHeader" max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Jelentkezz kritikusnak!
                      </v-btn>
                    </template>

                    <template #default="{ isActive }">
                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
                      <v-card>
                        <v-card-title>Kritikus űrlap</v-card-title>
                        <v-card-text>
                          <v-textarea v-model="description" label="Írja le miért lenne jó kritikus" variant="outlined" required></v-textarea>
                          <v-select
                            :items="roles"
                            item-title="name"
                            item-value="id"
                            v-model="selectedRole"
                            label="Válassza ki kritikusi szerepkörét"
                            hide-details
                          ></v-select>
                        </v-card-text>
                        <v-card-actions style="padding: 24px; justify-content: flex-start;">
                          <v-btn variant="elevated" color="primary" class="text-surface" @click="sendRoleRequest">Űrlap elküldése</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
                <v-list-item v-if="authStore.userRole == 'Admin'">
                  <v-dialog v-model="roleManagerDialog" max-width="700px">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps" color="primary" variant="text">
                        Jogok kezelése
                      </v-btn>
                    </template>
                    
                    <template #default="{ isActive }">
                      <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
                      <v-card>
                        <v-card-title>Jogok kezelése</v-card-title>
                        <v-card-text>
                          <div v-if="allUsers.length === 0" class="text-center">
                            <p>Nincsenek felhasználók</p>
                          </div>

                          <v-table v-else>
                            <thead>
                              <tr>
                                <th class="text-left">
                                <h3>Felhasználónév</h3>
                                </th>
                                <th class="text-center">
                                <h3>Jog</h3>
                                </th>
                                <th class="text-right">
                                  <h3>Jogok kezelése</h3>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="user in allUsers" :key="user.ID">
                                <td class="text-left text-h6">{{ user.userName }}</td>
                                <td class="text-center text-h6">{{ user.role }}</td>
                                <td class="text-right" style="padding: 10px;">
                                  <v-btn  @click="promoteToAdmin(user.ID)" width="150px" variant="elevated" color="success" class="text-surface">Admin jog adás</v-btn>
                                  <v-spacer style="margin: 10px !important;"></v-spacer>
                                  <v-btn @click="demoteToUser(user.ID)" width="150px" variant="elevated" color="warning" class="text-surface">Jog elvétele</v-btn>
                                </td>
                              </tr>
                            </tbody>
                          </v-table>
                        </v-card-text>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item>
                <v-list-item>
                  <v-btn variant="text" color="primary" class="ma-1" @click="handleLogout">
                    Kijelentkezés
                  </v-btn>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </div>
      </nav>
    </v-app-bar>

    <!-- Searchbar itemek -->
    <div class="search-overlay" v-if="searchResults.length > 0" ref="searchContainer">
      <v-card>
        <v-card-text>
          <v-data-table
            hide-default-footer
            hide-default-header
            :items="searchResults"
            class="search-table"
          >
            <template v-slot:item="{ item }">
              <v-card
                class="d-flex search-item"
                hover
                
                @click="search = '', goToPlace(item.id)"
              >
                <div v-if="!mobile" class="search-image">
                  <v-img :src="item.picture" height="100" width="100" cover></v-img>
                </div>
                <v-spacer></v-spacer>
                <v-card-item style="font-size: 13px;">{{ item.name }}</v-card-item>
                <v-spacer></v-spacer>
                <v-card-item v-if="!mobile" style="font-size: 13px;">{{ item.category }}</v-card-item>
              </v-card>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>

    <!-- FŐ TARTALOM -->
    <div class="page-content">
      <v-container fluid class="main-container">
        <!-- Egyéb tartalom, például a router-view -->
        <router-view />
        <br>
        <br v-if="mobile">
      </v-container>
    </div>

    <!-- Visitor figyelmeztetés, X gombbal -->
    <v-container>
      <div class="visitor-container" v-if="showVisitor && !authStore.isLoggedIn && !['/login', '/registration'].includes(route.path)">
        <button class="close-btn-jelentkezzbe" @click="hideVisitor" aria-label="Bezárás">×</button>
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
          <v-dialog v-if="authStore.userRole == 'User'" v-model="applyDialogFooter" max-width="700px">
            <template #activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" color="primary" variant="text">
                Jelentkezz kritikusnak!
              </v-btn>
            </template>
            
            <template #default="{ isActive }">
              <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
              <v-card>
                <v-card-title>Kritikus űrlap</v-card-title>
                <v-card-text>
                  <v-textarea v-model="description" label="Írja le miért lenne jó kritikus" variant="outlined" required></v-textarea>
                  <v-select
                    :items="roles"
                    item-title="name"
                    item-value="id"
                    v-model="selectedRole"
                    label="Válassza ki kritikusi szerepkörét"
                    hide-details
                  ></v-select>
                </v-card-text>
                <v-card-actions style="padding: 24px; justify-content: flex-start;">
                  <v-btn variant="elevated" color="primary" class="text-surface" @click="sendRoleRequest">Űrlap elküldése</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <v-dialog v-if="authStore.userRole == 'Admin'" max-width="700px" v-model="applicationsDialogFooter">
            <template #activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" color="primary" variant="text">
                Jelentkezések
              </v-btn>
            </template>
            
            <template #default="{ isActive }">
              <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
              <v-card>
                <v-card-title>Kritikusi jelentkező űrlapok</v-card-title>
                <v-card-text>
                  <div v-if="pendingRequests.length === 0" class="text-center">
                      <p>Nincs függőben lévő kérelem</p>
                    </div>
                  <v-table v-else>
                    <thead>
                      <tr>
                        <th class="text-left">
                        <h3>Felhasználónév</h3>
                        </th>
                        <th class="text-right">
                          <h3>Űrlap</h3>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="request in pendingRequests" :key="request.id">
                        <td class="text-left">{{ request.User ? request.User.userName : 'N/A' }}</td>
                        <td class="text-right">
                          
                          <!-- Belső jelentkezési modal -->
                          <v-dialog v-model="isInnerDialogOpen" max-width="700px">
                            <template #activator="{ props: activatorProps }">
                              <v-btn v-bind="activatorProps" variant="elevated" color="primary"  class="text-surface" @click="openRequestModal(request)">
                                Űrlap megtekintése
                              </v-btn>
                            </template>
                            
                            <template #default="{ isActive }">
                              <button class="close-btn-modal" @click="isActive.value = false" aria-label="Bezárás">×</button>
                              <v-card v-if="selectedRequest">
                                <v-card-title>{{selectedRequest.User.userName}} űrlapja</v-card-title>
                                <v-card-text>
                                  <div>
                                    <h4>Indoklás</h4>
                                    <p style="padding-left: 20px; padding-right: 20px;">{{ selectedRequest.reason }}</p>
                                  </div>
                                  <br>
                                  <div>
                                    <h4>Szerepköre:</h4>
                                    <p>{{ selectedRequest.requested_role }}</p>
                                  </div>
                                </v-card-text>
                                <v-card-actions style="padding: 24px; justify-content: flex-start;">
                                  <v-btn variant="elevated" color="warning" class="text-surface" @click="denyRequest(selectedRequest.id)">Elutasítás</v-btn>
                                  <v-spacer></v-spacer>
                                  <v-btn variant="elevated" color="success" class="text-surface" @click="approveRequest(selectedRequest.id)">Elfogadás</v-btn>
                                </v-card-actions>
                              </v-card>
                            </template>
                          </v-dialog>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
              </v-card>
            </template>
            <!-- jog kezelés modal 2-->
          </v-dialog>
        </v-row>
      </v-footer>
    </v-navigation-drawer>
  </v-layout>
</template>

<style scoped>

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

.close-btn-jelentkezzbe {
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

.jelentkezesek {
  position: absolute;
  top: -15px;
  right: 50px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: left;
  background: transparent;
  border: none;
  font-size: 1.3rem;
  color: rgb(253,216,53);
  background-color: rgb(109,76,65);
  border-radius: 100%;
  height: 30px;
}

.close-btn-modal {
  position: absolute;
  top: 0px;
  right: 0px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: left;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgb(109,76,65);
  border-radius: 100%;
  z-index: 1;
}

/* Az app-bar már fixált, így a keresési eredményeket abszolút pozícionáljuk az app-bar alatt */
.search-overlay {
  position: fixed;
  top: 80px; /* az app-bar magassága */
  left: 240px;
  z-index: 1100;
  margin: 0 auto;
}

.search-item {
  margin: 3px;
  /* opcionális: alapértelmezett betűméret */
  font-size: 1rem;
}

.search-image {
  width: 100px;
  height: 65px;
  overflow: hidden;
}

.search-image .v-image__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* 1279px alatt kisebb méretek */
@media (max-width: 1279px) {
  .search-overlay {
    position: fixed;
  top: 80px; /* az app-bar magassága */
  left: 70px;
  z-index: 1100;
  margin: 0 auto;
  }
}


</style>