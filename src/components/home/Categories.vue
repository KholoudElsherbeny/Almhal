<template>
  <div class="top_categories">
    <div class="container">
      <ul class="list-unstyled d-flex align-items-center gap-3">
        <li v-for="item in props.items" :key="item.id">
          <router-link :to="`/categories/${item.id}`">
            {{ item[$i18n.locale].name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  items: {
    required: true,
  },
});
</script>

<style lang="scss">
.top_categories {
  margin-top: 10px;
  padding-block: 20px;
  ul {
    li {
      a {
        font-size: 1rem;
        font-weight: 700;
        color: $third_color;
      }
    }
  }
  //   background: $main_color;
}
</style>
