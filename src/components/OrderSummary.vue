<template>
  <div class="order_details_content_wrapper" v-if="carts">
    <div class="order_details_card">
      <h3>
        <img src="@/assets/icons/billing.svg" alt="billing_icon" />
        {{ $t("billingSummary") }}
      </h3>

      <!-- Count item in cart that Show in checkout page -->
      <div>
        <p class="d-flex w-100 justify-content-between">
          {{ $t("Cart") }}
          <span>({{ carts.length }} {{ $t("items") }})</span>
        </p>
      </div>
      <div>
        <p>
          {{ $t("subTotal") }}
          <span>({{ carts.length }} {{ $t("Product") }})</span>
        </p>
        <p>
          <bdi>جنيه {{ carts.length * 380 }} </bdi>
        </p>
      </div>
      <div>
        <p>
          {{ $t("vatCoverd") }}
        </p>
        <p>
          0
        </p>
      </div>

      <div>
        <p>{{ $t("delivery_price") }}</p>
        <p>20 جنيه</p>
      </div>
      <div class="total_price">
        <p>{{ $t("totalprice") }}</p>
        <p class="total_price_value">
          400 جنيه
        </p>
      </div>
      <div class="actions usu d-flex flex-wrap">
        <div class="checkout_button me-1">
          <button
            @click="$emit('buySuccess')"
            class="btn btn-primary custom-btn frm-action"
          >
            <!-- <img src="~/assets/media/icons/delivery.svg" alt="date_icon" /> -->

            {{ $t("buttons.buyNow") }}
          </button>
        </div>
      </div>
    </div>
    <!-- End Component In Cart Page -->
  </div>
</template>

<script>
export default {
  props: {
    carts: {
      required: true,
    },
  },
  computed: {
    total_price() {
      return this.carts.reduce((a, b) => a.price + b.price, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.order_details_content_wrapper {
  width: 100%;
  //  Start Styling Component In Checkout Page
  .order_details_card {
    background: var(--theme_second_bg_clr);
    border-radius: 8px;
    padding: 10px 16px 0;
    width: 100%;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h3 {
      font-size: 20px;

      color: black;
    }
    .offer_content_wrapper {
      position: relative;
      margin-bottom: 16px;
      background: #dcf3f3;
      border-radius: 4px;
      padding-inline: 8px;
      align-items: center;

      column-gap: 8px;
      overflow: hidden;
      * {
        color: #fff;
      }
      img {
        display: inline-block;
        width: 24px;
        height: 24px;
      }
      .text {
        // @include verticalFlexStartAlignment;
        position: relative;
        z-index: 10;
        h5 {
          font-size: 18px;
          color: #070706;
          line-height: 20px;
        }
        p {
          color: #070706;
          font-size: 14px;
        }
      }
      .progress {
        position: absolute;
        left: 0;
        height: 100%;

        width: 50%;
        background: #65cecb;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
      }
    }
    //Styling  Facts containers
    div {
      margin-block: 17px;
      @media (max-width: 450px) {
        &.usu {
          margin-block: 14px;
          position: fixed;
          bottom: -17px;
          background: #fff;
          z-index: 50;
          left: 0;
          right: 0;
          width: 100%;
          padding: 0 5px;
        }
      }
      p {
        color: black;
        font-size: 16px;

        span {
          color: var(--theme_gray_clr);
          font-size: 16px;
        }
      }
      p.cashback_value {
        background: #f7de6f;
        padding: 4px 8px !important;
        border-radius: 4px;
        display: inline-block;
      }
      p.cart_background {
        background: var(--neon_main_theme_clr);
      }
      a {
        text-decoration: underline;
        font-size: 16px;

        color: var(--theme_custom_red_clr);
      }
    }
    div.total_price {
      border-top: 1px solid #0001;
      padding-block-start: 17px;
      p.total_price_value {
        font-size: 20px;

        color: black;
      }
    }
    //Styling  go to Checkout Page
    .checkout_button {
      a {
        color: var(--white_clr);
        text-decoration: none;
      }
    }
  }
  .actions {
    a {
      font-size: 14px !important;
      padding-inline: 8px !important;
    }
    a[disabled] {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
