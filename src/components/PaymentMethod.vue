<template>
  <div class="payment_method_form">
    <div class="main-header d-flex align-items-center justify-content-between">
      <h4 class="">
        <img
          src="@/assets/icons/payment.svg"
          width="23"
          height="23"
          alt="payment"
        />
        {{ $t("paymentMethod") }}
      </h4>
    </div>

    <div class="d-flex flex-column justify-content-between">
      <label for="cash_method mb-0">
        <input
          type="radio"
          name="payment_method"
          v-model="data.paymentMethod"
          value="cash"
          id="cash_method"
        />

        <img src="@/assets/icons/cash.svg" />
        <span>{{ $t("cashOnDelivery") }}</span>
      </label>
      <label for="credit_method mb-0">
        <input
          type="radio"
          name="payment_method"
          v-model="data.paymentMethod"
          value="card"
          id="credit_method"
        />

        <img src="@/assets/icons/visa.svg" />
        <span>{{ $t("debitCreditCard") }}</span>
      </label>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["active"],
  data() {
    return {
      data: {
        cardNumber: null,
        year: null,
        code: null,
        cardName: null,
        month: null,
        paymentMethod: "cash",
      },

      hasEdit: false,
    };
  },
  mounted() {
    this.hasEdit = this.active;
    if (!this.data.paymentMethod) {
      this.hasEdit = true;
    }
  },
  watch: {
    active(newVal) {
      this.hasEdit = newVal;
    },
  },
  computed: {
    ...mapGetters({
      profile: "profile/getProfile",
      getAddresses: "cart/orderSummaryData",
    }),
  },
  methods: {
    savePayment() {
      this.hasEdit = false;
      this.$emit("getData", this.data.paymentMethod);
      this.$emit("nextStep");
    },
    setEdit() {
      this.hasEdit = true;

      this.$emit("openEdit");
    },
  },
};
</script>
<style lang="scss">
.payment_method_form {
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  .main-header h4 {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.2rem;
    margin-bottom: 1rem;
    img {
      margin-inline-end: 0.325rem;
    }
  }
  width: 100%;
  box-sizing: border-box;
  label {
    cursor: pointer;
    width: 100%;

    display: flex;
    align-items: center;

    justify-content: flex-start;
    column-gap: 8px;
    span {
      color: black;
      font-weight: 600;
      font-size: 15px;
    }
    span.polt {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid $main_color;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px;
      &::after {
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: inline-block;
        transition: all 0.1s linear;
      }
    }
  }
  input[type="radio"] {
    // display: none;
    &:checked + span.polt::after {
      background: $main_color;
    }
  }

  .payment_form {
    label {
      color: $main_color !important;
      font-size: 14px !important;
      margin: 0 !important;
    }
    .text-red {
      color: var(--theme_custom_red_clr) !important;
    }
  }
  span.budged {
    font-size: 22px !important;
    color: var(--theme_custom_red_clr);
  }
  .currency {
    line-height: 1.7;
    font-size: 14px !important;
    color: var(--theme_custom_red_clr);
  }

  background: #f6f6f6;
  &.edit {
    background: #fff;
    h4 {
      font-weight: 700;
    }
  }
}
</style>
