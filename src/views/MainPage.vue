<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <!-- isLoading이 true면 띄우기 -->
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
      // 데이터 불러오기 전에는 this.isLoading을 true로
      // 네트워크 속도 늦춰서 테스트 ㄱㄱ
      this.isLoading = true;
      console.log(
        `created훅에서 this.fetchData() -> src/api/index.js에서 export/import한 fetchPosts 함수 호출, 
        const {data} = await fetchPosts(); 바로 위
        `,
      );
      const { data } = await fetchPosts();
      console.log(
        'await fetchPosts() 바로 밑에 있는 문장... 비동기 처리가 끝났다는 걸 의미?',
      );
      // data를 받아오면 이제 this.isLoading을 false로
      this.isLoading = false;
      this.postItems = data.posts;
    },
  },
  created() {
    console.log('MainPage created');
    console.log('created 훅 내에서 this.fetchData()');
    this.fetchData();
  },
  mounted() {
    console.log('MainPage mounted');
  },
};
console.log('src/views/MainPage.vue script 마지막 줄');
</script>

<style></style>
