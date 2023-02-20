<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      <ul v-else>
        <PostListItem
          v-for="postItem in postItems"
          :key="postItem._id"
          :postItem="postItem"
        ></PostListItem>
      </ul>
    </div>
  </div>
</template>

<script>
console.log('src/views/MainPage.vue script');
// import PostListItem, LoadingSpinner 순서 바꾸면 콘솔창 출력 순서도 바뀌네
// template에서 먼저 쓰는 기준이 아니네
import PostListItem from '@/components/posts/PostListItem.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { fetchPosts } from '@/api/index';

export default {
  components: {
    PostListItem,
    LoadingSpinner,
  },
  data() {
    return {
      postItems: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      console.log(
        'created훅에서 호출 -> src/api/index.js에서 export/import한 fetchPosts 함수 호출',
      );
      const { data } = await fetchPosts();
      this.isLoading = false;
      this.postItems = data.posts;
    },
  },
  created() {
    this.fetchData();
  },
};
console.log('src/views/MainPage.vue script 마지막 줄');
</script>

<style></style>
