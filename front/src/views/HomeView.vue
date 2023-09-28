<template>
  <main>
    {{ products }}
  </main>
</template>

<script>
  import productsApi from '@/api/products'

  export default {
    data() {
      return {
        products: "234",
      };
    },
    async mounted() {
      this.products = (await productsApi.index()).data;
      console.log(this.products)
    },
  };
</script>
