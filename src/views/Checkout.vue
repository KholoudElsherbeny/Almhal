<template>
  <div class="container">
    <OrderSuccess v-if="success" />
    <div class="row" v-else>
      <div class="col-md-8">
        <DeliveryAddress />
        <PaymentMethod />
      </div>
      <div class="col-md-4">
        <div class="order-summary-wrapper w-100">
          <OrderSummary :carts="carts" @buySuccess="success = true" />
          <div class="more-info">
            <p class="available-payment">
              Avaliable payment methods
              <span><img src="@/assets/icons/visa.svg" alt="icon" /></span>
              <span
                ><img src="@/assets/icons/mastercard.svg" alt="icon"
              /></span>
            </p>

            <p class="desc">
              *Cashback money you can use within your next orders. More you can
              learn in
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderSummary from "@/components/OrderSummary.vue";
import DeliveryAddress from "@/components/DeliveryAddress.vue";
import OrderSuccess from "@/components/OrderSuccess.vue";
import PaymentMethod from "@/components/PaymentMethod.vue";
export default {
  components: {
    OrderSummary,
    DeliveryAddress,
    PaymentMethod,
    OrderSuccess,
  },
  data() {
    return {
      carts: null,
      success: false,
    };
  },
  mounted() {
    this.carts = JSON.parse(localStorage.getItem("cart"));
  },
};
</script>

<style></style>
