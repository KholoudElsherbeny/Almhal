<template>
  <div class="container mb-5">
    <div class="row">
      <div
        class="col-md-6 col-lg-4"
        v-for="product in productsToShow"
        :key="product.id"
      >
        <ProductCard class="items mb-3" :item="product" />
      </div>
    </div>
  </div>

  <!-- {{ home.banners }} -->
  <Loading v-if="pageLoading" />
</template>

<script setup>
import ProductCard from "@/components/ui/ProductCard.vue";
import { useStore } from "vuex";
import { onMounted, computed, ref, watch } from "vue";
import Loading from "@/components/Loading.vue";
import { useRoute } from "vue-router";
const store = useStore();
const route = useRoute();
const products = [
  {
    cat_id: 1,
    id: 2,
    ar: {
      name: "Mothercare بنطلون رياضي باللون الأرجواني",
      desc: "بنطلون رياضي باللون الأرجواني",
    },
    en: {
      name: "Mothercare بنطلون رياضي باللون الأرجواني",
      desc: "بنطلون رياضي باللون الأرجواني",
    },
    price: 150,
    offer_price: 750,
    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],
    discount: 80,
    image: new URL("@/assets/dummy/children/4.jpg", import.meta.url).href,
  },
  {
    cat_id: 1,
    id: 3,
    ar: {
      name: "Mothercare هودي بسحاب كامل - بنفسجي فاتح",
      desc: "هودي بسحاب كامل - بنفسجي فاتح",
    },
    en: {
      name: "Mothercare هودي بسحاب كامل - بنفسجي فاتح",
      desc: "هودي بسحاب كامل - بنفسجي فاتح",
    },
    price: 200,
    offer_price: 750,
    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],
    discount: 73,
    image: new URL("@/assets/dummy/children/1.jpg", import.meta.url).href,
  },
  {
    cat_id: 1,
    id: 4,
    ar: {
      name: "Baby Co. سالوبيت اطفال قطن صيفي ناعم مع غطاء للرأس",
      desc:
        "The color, design and material are amazing. Waited along time before we find baby’s clothes with ",
    },
    en: {
      name: "Baby Co. سالوبيت اطفال قطن صيفي ناعم مع غطاء للرأس",
      desc:
        "The color, design and material are amazing. Waited along time before we find baby’s clothes with ",
    },
    price: 179,
    offer_price: 400,
    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],
    discount: 55,
    image: new URL("@/assets/dummy/children/6.jpg", import.meta.url).href,
  },
  {
    cat_id: 1,
    id: 5,
    ar: {
      name: "Baby Co. تي شيرت قطني ازرق مطبوع ديناصور",
      desc:
        "تي شيرت قطني ناعم للأطفال بطباعة جرافيك فريدة من نوعها مصنوع بعناية من شركة بيبي كو لإطلالة عصرية رائعة لطفلك.تي شيرت قطني ناعم للأطفال بطباعة جرافيك فريدة من نوعها مصنوع بعناية من شركة بيبي كو لإطلالة عصرية رائعة لطفلك.تي شيرت قطني ناعم للأطفال بطباعة جرافيك فريدة من نوعها مصنوع بعناية من شركة بيبي كو لإطلالة عصرية رائعة لطفلك.",
    },
    en: {
      name: "Baby Co. تي شيرت قطني ازرق مطبوع ديناصور",
      desc:
        "تي شيرت قطني ناعم للأطفال بطباعة جرافيك فريدة من نوعها مصنوع بعناية من شركة بيبي كو لإطلالة عصرية رائعة لطفلك.تي شيرت قطني ناعم للأطفال بطباعة جرافيك فريدة من نوعها مصنوع بعناية من شركة بيبي كو لإطلالة عصرية رائعة لطفلك.تي شيرت قطني ناعم للأطفال بطباعة جرافيك فريدة من نوعها مصنوع بعناية من شركة بيبي كو لإطلالة عصرية رائعة لطفلك.",
    },
    price: 380,
    offer_price: 899,
    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],
    discount: 62,
    image: new URL("@/assets/dummy/children/5.jpg", import.meta.url).href,
  },
  {
    cat_id: 2,
    id: 6,
    ar: {
      name: "ADIDAS SPORTSWEAR T-SHIRT M SL SJ T",
      desc:
        "يجب أن تتماشى التيشيرتات الخاصة بك مع العمل القوي والجهد الذي تبذله مثل هذه التيشيرت التي لن تتوقف عن دعمك. إنها ناعمة ومريحة كما يجب أن تكون التيشيرت الكلاسيكيّة. شعار أديداس الرياضي أنيق لترتديها في أي مكان <br /> هذا المنتج مصنوع من مواد مُعاد تدويرها كجزء من طموحنا لإنهاء النفايات البلاستيكيّة. تدعم منتجاتنا القطنية زراعة القطن المُستدام. هذا جزء من طموحنا لإنهاء النفايات البلاستيكيّة",
    },
    en: {
      name: "ADIDAS SPORTSWEAR T-SHIRT M SL SJ T",
      desc:
        "يجب أن تتماشى التيشيرتات الخاصة بك مع العمل القوي والجهد الذي تبذله مثل هذه التيشيرت التي لن تتوقف عن دعمك. إنها ناعمة ومريحة كما يجب أن تكون التيشيرت الكلاسيكيّة. شعار أديداس الرياضي أنيق لترتديها في أي مكان <br /> هذا المنتج مصنوع من مواد مُعاد تدويرها كجزء من طموحنا لإنهاء النفايات البلاستيكيّة. تدعم منتجاتنا القطنية زراعة القطن المُستدام. هذا جزء من طموحنا لإنهاء النفايات البلاستيكيّة",
    },
    price: 380,
    offer_price: 899,
    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],
    discount: 62,
    image: new URL("@/assets/dummy/man/2.jpg", import.meta.url).href,
  },
  {
    cat_id: 2,
    id: 7,
    ar: {
      name: "American Eagle تي-شورت سوبر سوفت مزين بطبعة",
      desc:
        "Since 1977, American Eagle has offered an assortment of specialty apparel and accessories for men and women that enables self-expression and empowers our customers to celebrate their individuality. The brand has broadened its leadership in jeans by producing innovative fabric with options for all styles and fits for all at a value. We aren’t just passionate about making great clothing, we’re passionate about making real connections with the people who wear them.",
    },
    en: {
      name: "American Eagle تي-شورت سوبر سوفت مزين بطبعة",
      desc:
        "Since 1977, American Eagle has offered an assortment of specialty apparel and accessories for men and women that enables self-expression and empowers our customers to celebrate their individuality. The brand has broadened its leadership in jeans by producing innovative fabric with options for all styles and fits for all at a value. We aren’t just passionate about making great clothing, we’re passionate about making real connections with the people who wear them.",
    },
    price: 450,

    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],

    image: new URL("@/assets/dummy/man/1.jpg", import.meta.url).href,
  },
  {
    cat_id: 2,
    id: 8,
    ar: {
      name: "American Eagle تي-شورت سوبر سوفت مزين بطبعة",
      desc:
        "Since 1977, American Eagle has offered an assortment of specialty apparel and accessories for men and women that enables self-expression and empowers our customers to celebrate their individuality. The brand has broadened its leadership in jeans by producing innovative fabric with options for all styles and fits for all at a value. We aren’t just passionate about making great clothing, we’re passionate about making real connections with the people who wear them.",
    },
    en: {
      name: "American Eagle تي-شورت سوبر سوفت مزين بطبعة",
      desc:
        "Since 1977, American Eagle has offered an assortment of specialty apparel and accessories for men and women that enables self-expression and empowers our customers to celebrate their individuality. The brand has broadened its leadership in jeans by producing innovative fabric with options for all styles and fits for all at a value. We aren’t just passionate about making great clothing, we’re passionate about making real connections with the people who wear them.",
    },
    price: 450,

    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],

    image: new URL("@/assets/dummy/man/3.jpg", import.meta.url).href,
  },
  {
    cat_id: 2,
    id: 9,
    ar: {
      name: "محفظة رجالى وشنطة يد كاجول",
      desc:
        "محفظة يد لحمل جميع الاغراض ،بها 10 اماكن للكروت والصور اتنين سوستة خارجية وسوستة داخلية مع يد خليفة",
    },
    en: {
      name: "محفظة رجالى وشنطة يد كاجول",
      desc:
        "محفظة يد لحمل جميع الاغراض ،بها 10 اماكن للكروت والصور اتنين سوستة خارجية وسوستة داخلية مع يد خليفة",
    },
    price: 300,

    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],

    image: new URL("@/assets/dummy/man/4.jpg", import.meta.url).href,
  },
  {
    cat_id: 3,
    id: 10,
    ar: {
      name: "Menta By Coctail Printed Sweater-Multi Colors",
      desc:
        "تعتبر شركة كوكتيل من أكبر شركات العلامة التجارية للأزياء ومن أكبر شركات التوزيع , ويعتبر العميل هو أساس الشركة لعملنا الفريد من حيث التصميم المنتجات والمبيعات",
    },
    en: {
      name: "Menta By Coctail Printed Sweater-Multi Colors",
      desc:
        "تعتبر شركة كوكتيل من أكبر شركات العلامة التجارية للأزياء ومن أكبر شركات التوزيع , ويعتبر العميل هو أساس الشركة لعملنا الفريد من حيث التصميم المنتجات والمبيعات",
    },
    price: 450,

    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],

    image: new URL("@/assets/dummy/women/3.jpg", import.meta.url).href,
  },
  {
    cat_id: 3,
    id: 11,
    ar: {
      name: "Fashion Open Front Drop Shoulder Tassel Hem Kimono",
      desc:
        "تعتبر شركة كوكتيل من أكبر شركات العلامة التجارية للأزياء ومن أكبر شركات التوزيع , ويعتبر العميل هو أساس الشركة لعملنا الفريد من حيث التصميم المنتجات والمبيعات",
    },
    en: {
      name: "Fashion Open Front Drop Shoulder Tassel Hem Kimono",
      desc:
        "تعتبر شركة كوكتيل من أكبر شركات العلامة التجارية للأزياء ومن أكبر شركات التوزيع , ويعتبر العميل هو أساس الشركة لعملنا الفريد من حيث التصميم المنتجات والمبيعات",
    },
    price: 450,

    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],

    image: new URL("@/assets/dummy/women/1.jpg", import.meta.url).href,
  },
  {
    cat_id: 3,
    id: 12,
    ar: {
      name: "SHEIN Metal Frame Tinted Lens Glasses-6852",
      desc:
        "تعتبر شركة كوكتيل من أكبر شركات العلامة التجارية للأزياء ومن أكبر شركات التوزيع , ويعتبر العميل هو أساس الشركة لعملنا الفريد من حيث التصميم المنتجات والمبيعات",
    },
    en: {
      name: "SHEIN Metal Frame Tinted Lens Glasses-6852",
      desc:
        "تعتبر شركة كوكتيل من أكبر شركات العلامة التجارية للأزياء ومن أكبر شركات التوزيع , ويعتبر العميل هو أساس الشركة لعملنا الفريد من حيث التصميم المنتجات والمبيعات",
    },
    price: 199,

    sizes: ["M", "L", "XL"],
    colors: ["black", "blue", "gray"],

    image: new URL("@/assets/dummy/women/2.jpg", import.meta.url).href,
  },
];

const pageLoading = computed(() => store.getters.pageLoading);

const productsToShow = ref([]);
onMounted(() => {
  productsToShow.value = products.filter((el) => el.cat_id == route.params.id);
  setTimeout(() => store.commit("pageLoading", false), 500);
});
watch(
  () => route.params.id,
  () =>
    (productsToShow.value = products.filter(
      (el) => el.cat_id == route.params.id
    ))
);
</script>
