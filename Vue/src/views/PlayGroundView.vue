<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const API_BASE = "http://localhost:3000/api/placeview";
interface Place {
  id: number;
  url: string;
  title: string;
  rating: number;
}

const popularPlaces = ref<Place[]>([]);

const fetchPlaces = async () => {
  try {
    

    const popularResponse = await axios.get(`${API_BASE}/playground`);
    console.log("POPULAR RESPONSE:", popularResponse.data);
    popularPlaces.value = popularResponse.data.map((place: any) => ({
      id: place.id,
      url: place.url,
      title: place.title,
      rating: place.rating
    }));

  } catch (error) {
    console.error("Hiba történt a helyek lekérése közben:", error);
  }
};


  const loading = ref(false)
const displayedPlaces = ref(12);
const totalPlaces = computed(() => popularPlaces.value.length);
const loadMore = () => {
  displayedPlaces.value += 12;
}

onMounted(async () => {
  await fetchPlaces();
  
});

const tagItems = ["Gimnázium", "Egyetem", "Általános Iskola", "Technikum", "Gyakorló Gimnázium", "+Kollégium", "Gyakorló Általános Iskola", "Kísérleti Gimnázium", "Kísérleti Általános Iskola"];

// Új reaktív változók a szortírozáshoz
const sortDateAsc = ref(true);
const sortViewsAsc = ref(true);
const sortAlphaAsc = ref(true);

// Függvények a gombok állapotának váltásához
const toggleSortDate = () => {
  sortDateAsc.value = !sortDateAsc.value;
};

const toggleSortViews = () => {
  sortViewsAsc.value = !sortViewsAsc.value;
};

const toggleSortAlpha = () => {
  sortAlphaAsc.value = !sortAlphaAsc.value;
};
</script>
<template>
<div class="layout-wrapper">
  <v-container class="custom-drawer">
    <v-card class="drawer-content">
      <v-card-title class="text-h6">Szűrj tagek alapján:</v-card-title>
      <v-divider></v-divider>
        <v-checkbox
            v-for="tag in tagItems"
            :key="tag"
            :label="tag"
            :value="tag"
            hide-details
            variant="elevated" color="primary"
        />
    </v-card>
  </v-container>

  <!-- Eredeti container -->
  <v-container>
    <v-card max-width="1700px" style="margin-left: auto; margin-right: auto;">
      <v-card-title class="text-h4">Magyarország iskolái (2025)</v-card-title>
      <v-card-text class="text-h6">Itt külön kategóriák szerint szűrhet:</v-card-text>
      <v-card-actions>
          <v-btn @click="toggleSortDate" color="primary" class="text-surface">
            Dátum 
            <v-icon>{{ sortDateAsc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <v-btn @click="toggleSortViews" color="primary" class="text-surface">
            Megtekintések 
            <v-icon>{{ sortViewsAsc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <v-btn @click="toggleSortAlpha" color="primary" class="text-surface">
            {{ sortAlphaAsc ? 'A-Z' : 'Z-A' }}
          </v-btn>
          <v-btn color="primary" class="text-surface">
            Az embereknek legjobban tetszett
          </v-btn>
        </v-card-actions>
    </v-card>
    <v-row style="max-width: 1700px; margin: auto;">
      <v-col
        v-for="hely in popularPlaces.slice(0, displayedPlaces)" 
        :key="hely.title" 
        cols="12" sm="6" md="4" lg="3" xl="2"
      >
        <v-card rounded="xl" :disabled="loading" :loading="loading" class="md-10">
          <v-img height="250" :src="hely.url" cover></v-img>
          <v-card-item>
            <v-card-title>{{ hely.title }}</v-card-title>
          </v-card-item>
          <v-card-text>
            <v-rating readonly :model-value="hely.rating" :length="10" size="" active-color="primary"></v-rating>
          </v-card-text>
          <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface" style="margin: 15px;"> Adatlap </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      v-if="displayedPlaces < totalPlaces" 
      @click="loadMore"
      color="primary"
      class="text-surface"
      style="display: block; margin: auto; margin-bottom: 12px;"
    >
      Továbbiak betöltése
    </v-btn>
    <br>
  </v-container>
</div>

</template>

<style scoped>

.custom-drawer {
  flex: 0;
}

.drawer-content {
  background-color: rgb(253,216,53);
  padding: 20px;
  height: 100%;
}

.layout-wrapper {
  display: flex;
  padding: 20px;
}

</style>