<template>
  <section class="banner">
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center">
        <div class="social">
          <ul class="list-unstyled">
            <li>
              <a href="#"><font-awesome-icon icon="fa-brands fa-facebook" /></a>
            </li>
            <li>
              <a href="#"><font-awesome-icon icon="fa-brands fa-twitter" /></a>
            </li>
            <li>
              <a href="#"
                ><font-awesome-icon icon="fa-brands fa-instagram"
              /></a>
            </li>
          </ul>
        </div>

        <carousel
          wrapAround="true"
          autoplay="5000"
          :settings="settings"
          :items-to-show="1"
          :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
        >
          <slide class="item" v-for="product in items.items" :key="product.id">
            <img
              v-lazy="product.image"
              style="width: 100%;"
              :srcset="product.image"
              sizes="50vw"
              :alt="product.title || 'banner'"
            />
            <h3 class="title" v-if="product.title">{{ product.title }}</h3>
            <a
              :href="product.link"
              class="btn btn-primary see-more"
              v-if="product.link"
            >
              {{ $t("links.Learn More") }}
              <span>
                <font-awesome-icon
                  :icon="`fa-solid ${
                    $i18n.locale == 'en' ? 'fa-arrow-right' : 'fa-arrow-left'
                  } `"
                />
              </span>
            </a>
          </slide>

          <template #addons>
            <pagination />
          </template>
        </carousel>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

const items = defineProps(["items"]);
</script>

<style lang="scss">
.banner {
  margin-block: 10px;
  position: relative;

  .carousel {
    // width: 95%;
    width: 100%;
    flex: 1;
  }
  .item {
    h3.title {
      background: $main_color;
      color: #fff;
      position: absolute;
      padding: 5px 10px;
      left: 0;
      right: 0;
      width: fit-content;
      bottom: 30px;
      @media (max-width: 786px) {
        font-size: 18px;
      }
    }
    a.btn.see-more {
      position: absolute;
      bottom: 10px;
    }
  }

  .social {
    width: 55px;
    // position: absolute;
    // left: 10px;
    // top: 50%;
    // transform: translateY(-50%);
    @media (max-width: 992px) {
      display: none;
    }
    z-index: 10;
    li {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      a {
        display: inline-flex;
        font-size: 10px;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        background: $main-color;
        border-radius: 50%;
        color: #fff;
        font-size: 20px;
      }
    }
  }
}
</style>
