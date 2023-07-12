<template>
  <table class="product-list">
    <thead>
      <tr>
        <th>SKU</th>
        <th>Title</th>
        <th>Quantity</th>
        <th></th> <!-- Empty header for the remove button column -->
      </tr>
    </thead>
    <tbody>
      <ProductItem
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        @remove="removeProduct(index)"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductItem from './ProductItem.vue';
import {IProduct} from '../types/types';


export default defineComponent({
  name: 'ProductList',
  props: {
    products: {
      type: Array as () => IProduct[],
      required: true,
    },
  },
  methods: {
    removeProduct(index: number) {
      this.$emit('remove', index);
    },
  },
  components: {
    ProductItem,
  },
});
</script>

<style scoped>
.product-list {
  width: 100%;
}

.product-list th {
  background-color: #f2f2f2;
  padding: 8px 16px;
  text-align: left;
  font-weight: bold;
}

.product-list td {
  padding: 8px 16px;
}
@media (max-width: 480px) {
.product-list th {
    padding: 8px;
    font-size: 12px;
  }

  .product-list td {
    padding: 8px;
  }

  .product-item button {
    padding: 2px 4px;
    font-size: 10px;
  }
}
</style>
