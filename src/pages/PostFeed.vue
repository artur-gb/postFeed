<template>
  <pv-dialog
    v-model:visible="togglePopup"
    modal
    :header="toggledPost?.title"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid">
      <p>
        {{ toggledPost?.body }}
      </p>
      <p class="justify-self-end text-sm pr-2">user{{ toggledPost?.userId }}</p>
    </div>
  </pv-dialog>
  <div class="flex justify-center items-center">
    <div
      class="flex flex-col gap-3 max-h-screen max-w-[800px] p-2 md:p-10 grow"
    >
      <form @submit.prevent="fetchFeed" class="grid">
        <span
          class="p-input-icon-left border rounded border-violet-300 justify-self-end"
        >
          <Icon :icon="searchRounded" />
          <pv-input-text
            class="h-[36px] py-2 pl-8"
            v-model="searchKeywords"
            placeholder="Search"
          />
        </span>
      </form>
      <pv-skeleton v-if="isFeedLoading" height="50rem" />
      <div
        v-else-if="posts.length > 0"
        class="flex flex-col gap-4 overflow-auto"
      >
        <div
          v-for="post in posts"
          class="flex flex-col border gap-2 rounded p-2 border-violet-300 w-full bg-neutral-50"
        >
          <div
            class="flex justify-between items-center border-b border-violet-300"
          >
            <span class="text-violet-900 text-lg font-medium">{{
              post.title
            }}</span>
            <pv-button @click="onOpenPopup(post)">
              <template #icon>
                <Icon :icon="openInNewRounded" class="text-violet-900" />
              </template>
            </pv-button>
          </div>
          <span class="text-neutral-700">{{ post.body }}</span>
        </div>
      </div>
      <div v-else class="grid justify-center text-violet-900">
        <Icon :icon="iframeOffRounded" class="text-8xl" />
        <span class="text-3xl">no data</span>
      </div>
      <pv-paginator
        :rows="pagination.pageSize"
        :rowsPerPageOptions="pagination.pageSizes"
        :totalRecords="pagination.totalRecords"
        v-on:update:rows="pagination.onUpdatePageSize"
        @page="pagination.onUpdatePage"
        :pt="{ root: { style: { padding: '0' } } }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";

import PvPaginator from "primevue/paginator";
import PvSkeleton from "primevue/skeleton";
import PvInputText from "primevue/inputtext";
import PvButton from "primevue/button";
import PvDialog from "primevue/dialog";

import { useFeedService } from "../services/useFeedService";
import { Post } from "../types/Post";

import { Icon } from "@iconify/vue";
import searchRounded from "@iconify-icons/material-symbols/search-rounded";
import openInNewRounded from "@iconify-icons/material-symbols/open-in-new-rounded";
import iframeOffRounded from "@iconify-icons/material-symbols/iframe-off-rounded";

const feedService = useFeedService();

const posts = ref<Post[]>([]);
const isFeedLoading = ref(false);

const fetchFeed = async () => {
  isFeedLoading.value = true;
  try {
    const result = await feedService.listAll({
      pageSize: pagination.pageSize,
      page: pagination.page as number,
      keywords: searchKeywords.value,
    });
    posts.value = result;
  } catch (error) {
    posts.value = [];
  }
  isFeedLoading.value = false;
};

onMounted(fetchFeed);

const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  totalRecords: 100,
  onUpdatePageSize: (val: number) => {
    pagination.pageSize = val;
  },
  onUpdatePage: (val: { page: number }) => {
    pagination.page = val.page + 1;
  },
});

watch(() => pagination.page, fetchFeed);
watch(() => pagination.pageSize, fetchFeed);

const searchKeywords = ref("");

const togglePopup = ref(false);
const toggledPost = ref<Post>();

const onOpenPopup = (post: Post) => {
  togglePopup.value = true;
  toggledPost.value = post;
};
</script>

<style scoped>
:deep(.p-highlight) {
  background-color: rgb(237 233 254);
}
</style>
