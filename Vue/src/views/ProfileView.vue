<script lang="ts" setup>
  import { ref } from 'vue';
  
  const profileInfo = ref([
    { label: "Megjelenítendő név:", value: "FireBoy656565", link: "felhasznalo/nev-valtoztatas/" },
    { label: "Email:", value: "mark.ballon0507@gmail.com" },
    { label: "Megtekintéseim:", value: "969 epizód" },
    { label: "Jogosultság:", value: "Tag (Felnőtt: yes)" },
    { label: "Regisztráció:", value: "2022.01.18 22:15:45" },
    { label: "Utolsó művelet:", value: "2025.03.20 13:13:05" },
    { label: "Utolsó videónézés:", value: "2025.03.12 18:46:29" },
  ]);
</script>

<template>
    <v-container fluid class="pa-0" style="max-width: 1300px;">
      <v-card class="mx-auto pa-4" outlined>
        <v-row>
          <!-- Profil kép -->
          <v-col cols="12" sm="4" class="d-flex justify-center">
            <v-img
              src="https://magyaranime.eu/public/kepek/avatars/36772.png?1742472800"
              width="320"
              height="320"
              class="rounded"
            ></v-img>
          </v-col>
          <!-- Profil adatok -->
          <v-col cols="12" sm="8">
            <v-card-title class="headline">Üdvözöllek, FireBoy656565!</v-card-title>
            <v-card-text>
              <v-row dense class="mb-2" v-for="(item, index) in profileInfo" :key="index">
                <v-col cols="4">
                  {{ item.label }}
                </v-col>
                <v-col cols="8">
                  <template v-if="item.link">
                    {{ item.value }}
                    <v-btn small text color="primary" :to="item.link">Módosítás</v-btn>
                  </template>
                  <template v-else>
                    {{ item.value }}
                  </template>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" depressed>Az email címed megerősítve!</v-btn>
              <v-btn color="error" depressed>
                <v-icon left>mdi-skull</v-icon>
                Fiók eltávolítása
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
      <!-- Gombok sor -->
      <v-row justify="center" class="ma-4" dense>
        <v-col cols="auto">
          <v-btn variant="elevated" color="primary" class="text-surface">Profilkép módosítása</v-btn>
          <v-btn variant="elevated" color="primary" class="text-surface">Adataim módosítása</v-btn>
        </v-col>
      </v-row>
      <v-card class="mx-auto pa-4" outlined>
        <v-card-title class="text-h5">Itt töltsd fel a profilképed:</v-card-title>
        <v-file-upload title="Profilkép feltöltése" ref="fileUploadRef" accept="image/*" clearable density="comfortable" variant="comfortable"><template #icon><v-icon variant="elevated" color="primary"></v-icon></template></v-file-upload>
          <v-card-actions style="justify-content: flex-start;">
            <v-btn variant="elevated" color="primary" class="text-surface">Feltöltés</v-btn>
          </v-card-actions>
      </v-card>
    </v-container>
</template>
  