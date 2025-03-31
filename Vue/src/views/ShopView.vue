<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useDisplay } from 'vuetify';

const API_BASE = "http://localhost:3000/api/placeview";
interface Place {
  id: number;
  url: string;
  title: string;
  rating: number;
}

const selectedTags = ref<string[]>([]);

const popularPlaces = ref<Place[]>([]);

const fetchPlaces = async (sort = "visits") => {
  try {
    let tagParams = "";
    if (selectedTags.value.length > 0) {
      tagParams = selectedTags.value.map(tag => `tag=${encodeURIComponent(tag)}`).join("&");
    }

    const popularResponse = await axios.get(`${API_BASE}/shop?sort=${sort}&${tagParams}`);

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

const tagItems = ["Sarki Bolt", "Kis Bolt", "Szupermarket", "Díjnyertes", "Drogéria", "Szakbolt", "Elektronikai áruház", "Dohánybolt", "Online", "Bevásárlóközpont", "Könyvesbolt"];



const sortDateAsc = ref(true);
const sortViewsAsc = ref(true);
const sortAlphaAsc = ref(true);


const toggleSortDate = async () => {
  sortDateAsc.value = !sortDateAsc.value;
  await fetchPlaces(sortDateAsc.value ? "oldest" : "latest");
};

const toggleSortViews = async () => {
  sortViewsAsc.value = !sortViewsAsc.value;
  await fetchPlaces(sortViewsAsc.value ? "visitsAsc" : "visits");
};

const toggleSortAlpha = async () => {
  sortAlphaAsc.value = !sortAlphaAsc.value;
  await fetchPlaces(sortAlphaAsc.value ? "abc" : "abcReverse");
};

watch(selectedTags, () => {
  fetchPlaces(); 
});

const toggleSortLikes = async () => {
  await fetchPlaces("mostLiked");
};

const { mobile, width } = useDisplay();

const layoutWrapperStyle = computed(() => {
  const count = popularPlaces.value.slice(0, displayedPlaces.value).length;
  if (count < 6 && width.value > 2068) {
    return { minWidth: '2068px' };
  }
  else if (count < 6 && width.value > 1630 && width.value < 2068) {
    return { minWidth: '1524px' };
  }
  return {};
});

const colProps = computed(() => {
  const count = popularPlaces.value.slice(0, displayedPlaces.value).length;
  if (count <= 2) {
    return { cols: 12, sm: 12, md: 6, lg: 6, xl: 6 };
  } else {
    return { cols: 12, sm: 12, md: 6, lg: 4, xl: 2 };
  }
});
</script>
<template>
<div class="layout-wrapper" :style="layoutWrapperStyle">
  <v-container class="custom-drawer">
    <v-card class="drawer-content">
      <v-card-title class="text-h6">Szűrj tagek alapján:</v-card-title>
      <v-divider></v-divider>
          <v-checkbox
            v-for="tag in tagItems"
            :key="tag"
            :label="tag"
            :value="tag"
            v-model="selectedTags"
            hide-details
            variant="elevated"
            color="primary"
          />
    </v-card>
  </v-container>

  <!-- Eredeti container -->
  <v-container>
    <v-card max-width="1700px" style="margin-left: auto; margin-right: auto;">
      <v-card-title v-if="!mobile" class="text-h4">Magyarország vegyesboltjai (2025)</v-card-title>
      <v-card-title v-if="mobile" class="text-h5">Magyarország vegyesboltjai (2025)</v-card-title>
      <v-card-text v-if="!mobile" class="text-h6">Itt külön kategóriák szerint szűrhet:</v-card-text>
      <v-card-text v-if="mobile" class="text-h7">Itt külön kategóriák szerint szűrhet:</v-card-text>
      <!-- A sort gombokat tartalmazó rész -->
      <div v-if="!mobile">
        <v-card-actions>
          <v-btn @click="toggleSortDate" color="primary" class="text-surface">
            Dátum 
            <v-icon>{{ sortDateAsc ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
          </v-btn>
          <v-btn @click="toggleSortViews" color="primary" class="text-surface">
            Megtekintések 
            <v-icon>{{ sortViewsAsc ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
          </v-btn>
          <v-btn @click="toggleSortAlpha" color="primary" class="text-surface">
            {{ sortAlphaAsc ? 'A-Z' : 'Z-A' }}
          </v-btn>
          <v-btn @click="toggleSortLikes" color="primary" class="text-surface">
            Az embereknek legjobban tetszett
          </v-btn>
        </v-card-actions>
      </div>
      <div v-else>
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-app-bar-nav-icon v-if="mobile" color="primary" v-bind="props"></v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item @click="toggleSortDate">
              <v-list-item-title>
                Dátum
                <v-icon small>{{ sortDateAsc ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="toggleSortViews">
              <v-list-item-title>
                Megtekintések
                <v-icon small>{{ sortViewsAsc ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="toggleSortAlpha">
              <v-list-item-title>
                {{ sortAlphaAsc ? 'A-Z' : 'Z-A' }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="toggleSortLikes">
              <v-list-item-title>
                Legjobban tetszett
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

    </v-card>
    <v-row style="max-width: 1700px; margin: auto;">
      <v-col
        v-for="hely in popularPlaces.slice(0, displayedPlaces)" 
        :key="hely.title" 
        v-bind:colProps
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
  min-height: 1300px;
}

</style>