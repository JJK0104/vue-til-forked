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
      // 근데 로그인 하고 새로고침하면 main.js부터 다시 실행되면서
      // 401에러(권한 에러)가 뜬다.
      // 즉 MainPage에 진입해서 게시글을 조회하는 post 요청을 날리는데 개발자 도구 - Network의 posts를 보면 Authorization: 속성이 비어있다
      // 왜냐면 여태까지 로그인한 상태를 자바스크립트 레벨에서 저장했었다
      // 자바스크립트 레벨은 뷰 개발자 도구의 store에 저장해놨다.
      // 근데 당연히 새로고침하면 자바스크립트가 refresh 상태가 되면서 state의 token과 username이 사라지면서
      // MainPage로 다시 진입할 때 로그인을 다시 하지 않으면 로딩스피너가 계속 뜨고 api 요청도 먹통이 된다
      // 이런 부분을 어떻게 쿠키로 처리할 수 있을지 살펴보자
      // LoginForm.vue를 보자
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
