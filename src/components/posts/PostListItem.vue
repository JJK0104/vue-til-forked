<template>
  <li>
    <div class="post-title">
      {{ postItem.title }}
    </div>
    <div class="post-contents">
      {{ postItem.contents }}
    </div>
    <div class="post-time">
      {{ postItem.createdAt }}
    </div>
  </li>
</template>

<script>
console.log('src/components/posts/PostListItem.vue script');
export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
};
console.log('src/components/posts/PostListItem.vue script 마지막 줄');
</script>

<style></style>
