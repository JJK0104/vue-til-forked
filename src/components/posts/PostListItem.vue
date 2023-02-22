<template>
  <li>
    <div class="post-title">
      {{ postItem.title }}
    </div>
    <div class="post-contents">
      {{ postItem.contents }}
    </div>
    <div class="post-time">
      <!-- vue filter 기능. 전역필터 -->
      {{ postItem.createdAt | formatDate }}
      <i class="icon ion-md-create" @click="routeEditPage"></i>
      <i class="icon ion-md-trash" @click="deleteItem"></i>
    </div>
  </li>
</template>

<script>
import { deletePost } from '@/api/posts';

export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  // 따로 모듈화 해서 main.js에서 import해서 쓸거다
  // main.js 가봐라
  // 얘는 지역 필터
  // filters: {
  //   formatDate(value) {
  //     const date = new Date(value);
  //     const year = date.getFullYear();
  //     let month = date.getMonth() + 1;
  //     month = month > 9 ? month : `0${month}`;
  //     const day = date.getDate();
  //     let hours = date.getHours();
  //     hours = hours > 9 ? hours : `0${hours}`;
  //     const minutes = date.getMinutes();
  //     return `${year}-${month}-${day} ${hours}:${minutes}`;
  //   },
  // },
  methods: {
    async deleteItem() {
      if (confirm('You want to delete it?')) {
        await deletePost(this.postItem._id);
        this.$emit('refresh');
      }
    },
    routeEditPage() {
      const id = this.postItem._id;
      this.$router.push(`/post/${id}`);
    },
  },
};
</script>

<style></style>
