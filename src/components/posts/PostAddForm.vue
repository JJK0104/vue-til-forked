<template>
  <div class="contents">
    <h1 class="page-header">Create Post</h1>
    <div class="form-wrapper">
      <!-- create 버튼 누르거나 엔터 쳤을 때  -->
      <form class="form" @submit.prevent="submitForm">
        <div>
          <!-- 게시글 제목 -->
          <label for="title">Title:</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <!-- 컨텐츠 -->
          <label for="contents">Contents:</label>
          <!-- textarea row로 줄 개수 -->
          <textarea id="contents" type="text" rows="5" v-model="contents" />
          <!-- 컨텐츠 길이 유효성 검사 -->
          <p
            v-if="!isContentsValid"
            class="validation-text warning isContentTooLong"
          >
            Contents length must be less than 250
          </p>
        </div>
        <!-- 버튼 -->
        <button type="submit" class="btn">Create</button>
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { createPost } from '@/api/index';

export default {
  data() {
    return {
      title: '',
      contents: '',
      logMessage: '',
    };
  },
  computed: {
    isContentsValid() {
      return this.contents.length <= 200;
    },
  },
  methods: {
    async submitForm() {
      try {
        const response = await createPost({
          // api 문서에 정의된 속성
          title: this.title,
          contents: this.contents,
        });
        console.log(response);
      } catch (error) {
        console.log(
          'error.response.data.message :',
          error.response.data.message,
        );
        this.logMessage = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
.form-wrapper .form {
  width: 100%;
}
.btn {
  color: white;
}
</style>
