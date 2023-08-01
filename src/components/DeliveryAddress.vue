<template>
  <div class="delivery_address_section" :class="{ edit: hasEdit }">
    <div class="main-header d-flex align-items-center justify-content-between">
      <h4 class="">
        <img
          src="@/assets/icons/address.svg"
          width="23"
          height="23"
          alt="profile"
        />
        {{ $t("deliveryAddress") }}
      </h4>
    </div>

    <div class="d-flex justify-content-between">
      <div class="step_data">
        <div class="phone">
          <p>
            Nasr El Din Mostafa St. Cairo, Egypt
          </p>
          <p>+20 1099556719 / info@alalmiyalhura.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["active"],
  data() {
    return {
      data: {
        type: "home",
        lat: null,
        lng: null,
        notes: null,
        building: null,
        intercomCode: null,
        floor: null,
        apartment: null,
        location: null,
        place_description: null,
      },
      myData: null,
      address_id: null,
      hasEditPhone: false,
      hasEdit: false,
      mapOpen: false,
      addresses: [],
      myAddress: [],
      selectedAddress: null,
      location: null,
    };
  },
  mounted() {
    this.hasEdit = this.active;
    if (this.allAddress) {
      this.allAddress.map((el) => {
        if (el.is_default) {
          this.selectedAddress = el;
          this.location = {
            lat: el.lat,
            lng: el.lng,
            place_description: el.place_description,
          };
          this.data.place_description = el.place_description;
          this.data.lat = el.lat;
          this.data.lng = el.lng;
          this.$emit("nextStep");
          this.$emit("getData", this.selectedAddress);
          this.hasEdit = false;
        }
      });
    }
    this.addresses = this.allAddress;
  },
  computed: {
    allAddress() {
      return this.$store.getters["profile/getAddresses"];
    },
  },
  watch: {
    active(newVal) {
      this.hasEdit = newVal;
    },
    allAddress(newVal) {
      this.addresses = newVal;
      if (newVal.length) {
        newVal.map((el) => {
          if (el.is_default) {
            this.selectedAddress = el;
            this.location = {
              lat: el.lat,
              lng: el.lng,
              place_description: el.place_description,
            };
            this.hasEdit = false;
            this.$emit("nextStep");
            this.$emit("getData", this.selectedAddress);
          }
        });
        // this.selectedAddress = newVal[0];
      }
    },
    address_id(newVal) {
      if (newVal) {
        this.getAddress();
      }
    },
  },
  methods: {
    saveAddress() {
      this.$refs.formRegister.validate().then((d) => {
        if (d) {
          const frmData = new FormData();
          frmData.append("type", this.data.type);
          frmData.append("place_description", this.data.place_description);
          if (this.data.lat) {
            frmData.append("lat", this.data.lat);
          }
          if (this.data.lng) {
            frmData.append("lng", this.data.lng);
          }
          if (this.data.building) {
            frmData.append("building", this.data.building);
          }
          if (this.data.floor) {
            frmData.append("floor", this.data.floor);
          }
          if (this.data.apartment) {
            frmData.append("apartment", this.data.apartment);
          }
          if (this.data.notes) {
            frmData.append("location_description", this.data.notes);
          }
          frmData.append("is_default", 1);

          this.$axios.post("addresses", frmData).then((res) => {
            this.selectedAddress = res.data.data;
            this.$emit("getData", this.selectedAddress);
            this.$emit("nextStep");
          });
        }
      });
    },
    getAddress() {
      this.loading = true;
      this.$axios
        .get("addresses/" + this.address_id)
        .then((res) => {
          this.myData = res.data.data;
          this.data = this.myData;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    setLocation(e) {
      this.data.lat = e.lat;
      this.data.lng = e.lng;
      this.data.place_description = e.address;
    },
    setEdit() {
      this.hasEdit = true;

      this.$emit("openEdit");
      if (this.address_id) {
        this.getAddress();
      }
    },
    selectAddress(add) {
      if (this.allAddress?.length) {
        const found = this.allAddress.find((el) => el.type == add);
        if (found) {
          this.address_id = found.id;
        } else {
          this.address_id = null;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.delivery_address_section {
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
  .addresses_type {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1rem;
    // justify-content: space-between;
    .input-group {
      width: fit-content;
      min-width: 150px;
      input {
        display: none;
        &:checked {
          + label {
            span {
              color: var(--theme_custom_red_clr);
              font-weight: 600;
            }
          }
        }
      }
      label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        span {
          font-size: 16px;
        }
      }
    }
  }
  .inputs_field {
    flex-wrap: wrap;
    padding: 0;
    margin-bottom: 1rem;
    label {
      color: black;
      font-weight: 700;
      font-size: 15px;
      line-height: 30px;
    }
    &.optionals {
      display: inline-flex;
      flex-direction: column;
      margin-inline-end: 1rem;

      .input_wrapper {
        max-width: 150px;
      }
    }
  }
  .open_map_button {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: $main_color;
    font-weight: 600;
    img {
      margin-inline-end: 0.325rem;
    }
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
