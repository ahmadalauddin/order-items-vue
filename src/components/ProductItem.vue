<template>
  <tr class="product-item">
    <td>{{ product.sku }}</td>
    <td>{{ product.title }}</td>
    <td>{{ product.quantity }}</td>
    <td><button style="right: 0;" @click="remove">Remove</button></td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {IProduct} from '../types/types';

export default defineComponent({
  name: 'ProductItem',
  props: {
    product: {
      type: Object as () => IProduct,
      required: true,
    },
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
  },
});
</script>

<style scoped>
 button {
  background-color: #757575;
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

button:hover {
  background-color: #cc0000;
}

td {
    padding: 8px 16px;
  }
</style>
