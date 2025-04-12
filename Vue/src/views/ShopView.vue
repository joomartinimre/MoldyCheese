<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { useDisplay } from 'vuetify';
import { usePageLoader } from '@/composables/usePageLoader';
import type { SortingState } from '@tanstack/vue-table';

const API_BASE = "http://localhost:3000/api/placeview";

interface Place {
  id: number;
  url: string;
  title: string;
  rating: number;
  visits?: number;
  createdAt?: string;
  likes?: number;
}

const sorting = ref<SortingState>([]);

const { loading, startLoading, stopLoading } = usePageLoader();

const selectedTags = ref<string[]>([]);
const tagItems = [
  "Sarki Bolt", "Kis Bolt", "Szupermarket", "Díjnyertes",
  "Drogéria", "Szakbolt", "Elektronikai áruház", "Dohánybolt",
  "Online", "Bevásárlóközpont", "Könyvesbolt"
];

const popularPlaces = ref<Place[]>([]);

const latestPlaces = ref<Place[]>([]);
const mostVisitedPlaces = ref<Place[]>([]);
const abcPlaces = ref<Place[]>([]);
const mostLikedPlaces = ref<Place[]>([]);

const currentPlaces = ref<Place[]>([]);

const sortDateAsc = ref(false);
const sortViewsAsc = ref(false);
const sortAlphaAsc = ref(false);

const displayedPlaces = ref(12);
const totalPlaces = computed(() => currentPlaces.value.length);

const loadMore = () => {
  displayedPlaces.value += 12;
};

const fetchPlaces = async (sort = "visits"): Promise<Place[]> => {
  startLoading();
  try {
    let tagParams = "";
    if (selectedTags.value.length > 0) {
      tagParams = selectedTags.value.map(tag => `tag=${encodeURIComponent(tag)}`).join("&");
    }

    const response = await axios.get(`${API_BASE}/shop?sort=${sort}&${tagParams}`);
    return response.data.map((place: any) => ({
      id: place.id,
      url: place.url,
      title: place.title,
      rating: place.rating,
      visits: place.visits,
      createdAt: place.createdAt,
      likes: place.likes,
    }));
  } catch (error) {
    console.error("Hiba történt a helyek lekérése közben:", error);
    return [];
  } finally {
    stopLoading();
  }
};

const loadAllSorts = async () => {
  const [latest, visited, abc, liked] = await Promise.all([
    fetchPlaces("latest"),
    fetchPlaces("visits"),
    fetchPlaces("abc"),
    fetchPlaces("mostLiked"),
  ]);

  latestPlaces.value = latest;
  mostVisitedPlaces.value = visited;
  abcPlaces.value = abc;
  mostLikedPlaces.value = liked;
  currentPlaces.value = visited;
};

onMounted(async () => {
  await loadAllSorts();
});

const toggleSortDate = () => {
  sortDateAsc.value = !sortDateAsc.value;
  currentPlaces.value = sortDateAsc.value
    ? [...latestPlaces.value].reverse()
    : latestPlaces.value;
};

const toggleSortViews = () => {
  sortViewsAsc.value = !sortViewsAsc.value;
  currentPlaces.value = sortViewsAsc.value
    ? [...mostVisitedPlaces.value].reverse()
    : mostVisitedPlaces.value;
};

const toggleSortAlpha = () => {
  sortAlphaAsc.value = !sortAlphaAsc.value;
  currentPlaces.value = sortAlphaAsc.value
    ? abcPlaces.value
    : [...abcPlaces.value].reverse();
};

const toggleSortLikes = () => {
  currentPlaces.value = mostLikedPlaces.value;
};

watch(selectedTags, async () => {
  const [latest, visited, abc, liked] = await Promise.all([
    fetchPlaces("latest"),
    fetchPlaces("visits"),
    fetchPlaces("abc"),
    fetchPlaces("mostLiked"),
  ]);

  latestPlaces.value = latest;
  mostVisitedPlaces.value = visited;
  abcPlaces.value = abc;
  mostLikedPlaces.value = liked;

  if (sortDateAsc.value) {
    currentPlaces.value = [...latest].reverse();
  } else if (sortViewsAsc.value) {
    currentPlaces.value = [...visited].reverse();
  } else {
    currentPlaces.value = visited;
  }
});

const columns = [
  {
    header: 'Név',
    accessorKey: 'title',
  },
  {
    header: 'Rating',
    accessorKey: 'rating',
  },
  {
    header: 'Látogatottság',
    accessorKey: 'visits',
  },
  {
    header: 'Létrehozva',
    accessorKey: 'createdAt',
    cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    header: 'Like-ok',
    accessorKey: 'likes',
  },
];



const { mobile, width } = useDisplay();

const layoutWrapperStyle = computed(() => {
  const count = currentPlaces.value.length;
  if (count < 6 && width.value > 2068) {
    return { minWidth: '2068px' };
  }
  else if (count < 6 && width.value > 1630 && width.value < 2068) {
    return { minWidth: '1524px' };
  }
  return {};
});

const colProps = computed(() => {
  const count = currentPlaces.value.length;
  if (count <= 2) {
    return { cols: 12, sm: 12, md: 6, lg: 6, xl: 6 };
  } else {
    return { cols: 12, sm: 12, md: 6, lg: 4, xl: 2 };
  }
});
</script>

<template>
<v-container v-if="loading" class="loading-screen">
  <v-progress-circular
    indeterminate
    color="primary"
    size="40"
  ></v-progress-circular>
  <p>Betöltés folyamatban...</p>
</v-container>
<div v-else class="layout-wrapper" :style="layoutWrapperStyle">
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
  <v-container>
    <v-card max-width="1700px" style="margin-left: auto; margin-right: auto;">
      <v-card-title style="white-space: normal;" v-if="!mobile" class="text-h4">Magyarország vegyesboltjai (2025)</v-card-title>
      <v-card-title style="white-space: normal;" v-if="mobile" class="text-h5">Magyarország vegyesboltjai (2025)</v-card-title>
      <v-card-text style="white-space: normal;" v-if="!mobile" class="text-h6">Itt külön kategóriák szerint szűrhet:</v-card-text>
      <v-card-text style="white-space: normal;" v-if="mobile" class="text-h7">Itt külön kategóriák szerint szűrhet:</v-card-text>
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
        v-for="hely in currentPlaces.slice(0, 12)" 
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

.loading-screen {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 550px) {
  .drawer-content {
    padding: 10px;
    font-size: 0.8rem;
  }

  .drawer-content * {
    font-size: 0.8rem !important;
  }

  .v-col .v-card-title {
    font-size: 0.9rem;
  }

  .v-col .v-card-text {
    font-size: 0.7rem;
    padding-bottom: 0px !important;
  }

  
  .v-container {
    padding: 4px;
  }
}

</style>