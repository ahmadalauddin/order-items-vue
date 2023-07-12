<template>
  <div class="order-item" :class="{ 'expanded': isExpanded }">
    <div class="flex flex-row justify-between align-center order-header" @click="toggleExpansion">
      <h3>Order Reference: {{ order.reference_number }}</h3>
      <button @click="removeOrderItem" class="remove-btn">Remove Order</button>
    </div>
    <Address :address="order.address" />

    <div v-show="isExpanded">
      <h4>Product List:</h4>
      <ProductList :products="productsForOrder" @remove="removeProduct" />
      <div class="add-product flex flex-col">
        <h5>Add more products to order item</h5>
        <div class="flex flex-row">

          <select v-model="selectedProduct" class="product-select">
            <option value="" disabled>Select a product</option>
            <option v-for="product in availableProducts" :value="product.sku" :key="product.sku">
              {{ product.title }}
            </option>
          </select>

          <input type="number" v-model.number="selectedQuantity" class="quantity-input" placeholder="Quantity" />
          <button @click="addProduct" :disabled="!selectedProduct || selectedQuantity <= 0" class="add-btn">Add
            Product</button>

        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import Address from './OrderAddress.vue';
import ProductList from './ProductList.vue';
import { IOrder, IProduct } from '../types/types';

export default defineComponent({
  name: 'OrderItem',
  components: {
    Address,
    ProductList,
  },
  props: {
    order: {
      type: Object as PropType<IOrder>,
      required: true,
    },
    productList: {
      type: Array as PropType<IProduct[]>,
      required: true,
    },
  },

  data() {
    const isExpanded = ref(true);
    const isMobile = window.matchMedia('(max-width: 480px)').matches;
    if (!isMobile) {
      // Expand order items on non-mobile devices
      isExpanded.value = true;
    }

    const toggleExpansion = () => {
      isExpanded.value = !isExpanded.value;
    };

    const handleWindowResize = () => {
      const isMobile = window.innerWidth <= 480;
      if (isMobile) {
        isExpanded.value = false; // Collapse order items on mobile devices
      } else {
        isExpanded.value = true; // Expand order items on non-mobile devices
      }
    };

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return {
      isExpanded,
      toggleExpansion,
      orderCopy: { ...this.order },
      selectedProduct: '',
      selectedQuantity: 1,
    };
  },
  computed: {
    productsForOrder(): IProduct[] {
      return this.orderCopy.products.map((product: IProduct) => {
        const matchedProduct = this.productList.find(
          (p: IProduct) => p.sku === product.sku
        );
        if (matchedProduct) {
          return { ...matchedProduct, quantity: product.quantity };
        }
        return null;
      }).filter(Boolean) as IProduct[];
    },
    availableProducts(): IProduct[] {
      const orderedProductSkus = this.order.products.map(
        (product: IProduct) => product.sku
      );

      return this.productList.filter((product: IProduct) => {
        return !orderedProductSkus.includes(product.sku) || product.quantity > 0;
      });
    },
  },
  methods: {
    removeProduct(index: number) {
      this.orderCopy.products.splice(index, 1);
    },
    removeOrderItem() {
      this.$emit('remove');
    },
    addProduct() {
      const selectedProduct = this.availableProducts.find(
        (product: IProduct) => product.sku === this.selectedProduct
      );

      if (selectedProduct) {
        const updatedOrder = { ...this.order };
        const existingProduct = updatedOrder.products.find(
          (product: IProduct) => product.sku === selectedProduct.sku
        );

        if (existingProduct) {
          existingProduct.quantity += this.selectedQuantity;
        } else {
          updatedOrder.products.push({
            sku: selectedProduct.sku,
            quantity: this.selectedQuantity,
          });
        }

        this.$emit('update:order', updatedOrder);

        this.selectedProduct = '';
        this.selectedQuantity = 1;
      }
    },
  },
});
</script>

<style scoped>
.order-header {
  cursor: pointer;
  background-color: #f5f5f5;
  padding: 0px 16px;
  border-radius: 10px;
}

.order-item {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}

.order-item h3 {
  font-size: 20px;
  margin-bottom: 8px;
}

.order-item h4 {
  font-size: 16px;
  margin-bottom: 8px;
}

.order-item button {
  background-color: #757575;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  height: fit-content;
}

.remove-btn:hover {
  background-color: #cc0000;
}

.add-btn {
  flex: none;
}

.add-btn:hover {
  background-color: #98BBE0;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.justify-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.add-product {
  margin-top: 16px !important;
  border-top: 1px dashed #bbb;
  ;
}

.product-select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  margin-right: 8px;
}

.quantity-input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
  box-sizing: border-box;
  margin-right: 8px;
}




@media (max-width: 480px) {

  .order-item {
    padding: 8px;
    margin-bottom: 8px;
    
  }

  .order-item h3 {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .order-item h4 {
    font-size: 14px;
    margin-bottom: 6px;
  }

  .order-item button {
    padding: 6px 10px;
    font-size: 12px;
  }
}
</style>