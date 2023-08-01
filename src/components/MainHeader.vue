<template>
  <teleport to="body">
    <div
      class="modal fade"
      id="cart-menu"
      tabindex="-1"
      aria-labelledby="cart-menuLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>

          <div class="modal-body">
            <cart-menu />
          </div>
        </div>
      </div>
    </div>
  </teleport>
  <teleport to="body">
    <div
      class="modal fade"
      id="navbar-menu"
      tabindex="-1"
      aria-labelledby="cart-navbar-menu"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>

          <div class="modal-body">
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/">
                  {{ $t("navs.home") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about-us">
                  {{ $t("navs.aboutUs") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/shop">
                  {{ $t("navs.Shop") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/contact-us">
                  {{ $t("navs.contactUs") }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </teleport>
  <teleport to="body">
    <search v-if="searchArea" @closeSearch="closeSearch" />
  </teleport>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    :class="pageScroll ? 'fixed-top' : ''"
    id="navbar"
  >
    <div class="container justify-content-center justify-content-md-between">
      <router-link to="/" class="navbar-brand mb-3 mb-sm-0" href="">
        <img src="@/assets/logo.png" width="120" alt="logo" />
      </router-link>

      <div
        class="collapse justify-content-center navbar-collapse"
        id="navbarSupportedContent"
      >
        <div class="form">
          <form @click.prevent>
            <div class="d-flex position-relative w-100">
              <input
                type="text"
                class="form-control"
                :placeholder="$t('placeholder.Enter search word')"
              />
              <button @click="openSearch">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />

                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="cart-wrapper">
        <router-link
          to="/login"
          class="btn btn-primary custom-btn"
          v-if="!isLoggedIn"
        >
          {{ $t("buttons.signIn") }}
        </router-link>
        <a
          role="button"
          class="btn btn-primary custom-btn"
          @click="logout"
          v-else
        >
          {{ $t("buttons.logout") }}
        </a>

        <a href="#" id="lang" @click="selLocale">
          <img
            width="20"
            height="20"
            class="img-fluid"
            src="@/assets/ar.png"
            alt="language"
            v-if="$i18n.locale == 'ar'"
          />
          <img
            v-else
            width="20"
            height="20"
            class="img-fluid"
            src="@/assets/en.png"
            alt="language"
          />
        </a>

        <a role="button" @click="openSearch" class="d-lg-none">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />

          <i class="fa-solid fa-magnifying-glass"></i>
        </a>
        <a
          role="button"
          class="cart-btn"
          data-bs-toggle="modal"
          data-bs-target="#cart-menu"
        >
          <font-awesome-icon icon="fa-solid fa-cart-arrow-down" />
          <span class="budget" v-if="totalQuantity != 0">
            {{ totalQuantity }}
          </span>
        </a>
        <router-link to="/washlist">
          <font-awesome-icon icon="fa-regular fa-heart" />
        </router-link>
        <!-- <router-link to="/account">
          <font-awesome-icon icon="fa-regular fa-user" />
        </router-link> -->
      </div>
    </div>
  </nav>
</template>

<script setup>
import Cookies from "js-cookie";
import CartMenu from "./CartMenu.vue";
import { ref, computed } from "vue";
import Search from "./Search.vue";
import { useStore } from "vuex";
const pageScroll = ref(false);
const searchArea = ref(false);

import i18n from "@/i18n";
const store = useStore();
function closeSearch() {
  searchArea.value = false;
}
const totalQuantity = computed(() => store.getters.totalQuantity);

const isLoggedIn = store.getters.isLoggedIn;

function logout() {
  store.dispatch("logout");
}

function openSearch() {
  searchArea.value = true;
}
function selLocale() {
  Cookies.set("locale", i18n.global.locale == "ar" ? "en" : "ar");
  setTimeout(() => window.location.reload(), 300);
}

window.addEventListener("scroll", () => {
  window.scrollY > 90 ? (pageScroll.value = true) : (pageScroll.value = false);
});
</script>

<style lang="scss">
.navbar {
  min-height: 100px;
  animation: move-out 0.3s linear forwards !important;

  &.fixed-top {
    opacity: 1;
    background: #fff;
    animation: move-in 0.3s linear forwards !important;
    @keyframes move-in {
      0% {
        transform: translateY(-10px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
  @keyframes move-out {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .navbar-nav {
    // height: 70px;
    .nav-item {
      .nav-link {
        height: 100%;
      }
    }
  }
  a {
    min-width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    &.nav-link {
      font: normal normal 300 18px/27px Montserrat;
      letter-spacing: 0px;
      color: #000;
      text-transform: capitalize;
      opacity: 1;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: $main_color;
        transition: all 0.3s ease-in;
        height: 3px;
        width: 0;
      }
      &:hover {
        &::after {
          width: calc(100% - 16px);
        }
      }
    }

    &.router-link-exact-active {
      font: normal normal 500 18px/27px Montserrat;
      letter-spacing: 0px;
      color: #0e3958;
      text-transform: capitalize;
      opacity: 1;
      &::after {
        width: calc(100% - 16px);
      }
    }
  }
  .cart-wrapper {
    display: flex;
    align-items: center;

    a.custom-btn {
      font: normal normal normal 11px/15px Montserrat !important;
      padding: 8px 20px;
    }
    .cart-btn {
      position: relative;
      span {
        position: absolute;
        top: -5px;
        right: 2px;
        background: red;
        outline: 1px solid #fff;
        border-radius: 50%;
        width: 13px;
        height: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        color: #fff;
      }
    }
  }
  .navbar-toggler {
    box-shadow: none !important;
    outline: none !important;
  }
  form {
    input {
      height: 45px !important;
      min-width: 300px !important;
    }
    button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      background: transparent;
    }
  }
}

body[dir="rtl"] {
  form {
    button {
      right: unset;
      left: 0;
    }
  }
}
</style>
