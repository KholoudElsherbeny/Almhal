<template>
  <div class="order_success">
    <div class="header">
      <h2 class="title">
        <img src="@/assets/icons/check.svg" alt="check_icon" />
        {{ $t("orderSentSuccessfully") }}
      </h2>
      <p class="desc">
        {{
          $t(
            "thankYouForPurchasingFromAlDukanYourOrderIsInProgressYouCanContinueShoppingOrTrackYourOrderFromOrdersInAccountSection"
          )
        }}
      </p>
    </div>
    <div class="order_details">
      <ul class="list-unstyled p-0 m-0">
        <li>
          <p>{{ $t("orderNumber") + ": " }} <span>#360</span></p>
        </li>

        <li>
          <p>
            {{ $t("deliveryAddress") + ": " }}
            <span> Nasr El Din Mostafa St. Cairo, Egypt</span>
          </p>
        </li>
        <li>
          <p>
            {{ $t("totalAmount") + ": " }}
            <span> 770 جنيه </span>
          </p>
        </li>
      </ul>
    </div>
    <div class="checkout_button d-flex align-items-center mt-5">
      <router-link to="/" class="btn btn-primary custom-btn frm-action">
        {{ $t("continueShopping") }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      location: null,
    };
  },
  methods: {
    getDate(date) {
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = new Date(date);
      let dayName = days[day.getDay()];

      let dateString = day.toLocaleDateString();
      let time = day.toLocaleTimeString();
      return (
        dayName + "," + dateString + " " + this.$t("expectedTime") + " " + time
      );
      // return { dayName, date, time };
    },
  },
};
</script>

<style lang="scss">
.order_success {
  background: var(--theme_second_bg_clr);
  padding: 1.5rem 2rem;
  border-radius: 0.35rem;
  .header {
    .title {
      color: var(--theme_custom_red_clr);
      font-size: 1.6rem !important;
      margin-bottom: 1rem;
    }
    .desc {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 30px !important;
    }
  }
  .order_details {
    ul {
      li {
        border-bottom: 0.5px solid #070706;
        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
        padding-block: 0.5rem;
        p {
          span {
            font-weight: bold;
          }
        }
        &:last-of-type {
          margin-bottom: 35px;
        }
      }
    }
  }
}
</style>
