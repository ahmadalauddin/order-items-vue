<template>
  <div class="app">
    <h2>Order List</h2>
    <input type="text" class="search-input" v-model="searchQuery" placeholder="Search..." />
    <ul>
      <OrderItem
        v-for="(order, index) in filteredOrderList"
        :key="index"
        :order="order"
        :productList="productList"
        @remove="removeOrderItem(index)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrderItem from './components/OrderItem.vue';
import {IOrder, IProduct} from './types/types';


const ORDER_ITEM: IOrder[] = [
  {
    reference_number: 'Ref1',
    address: '123 Main St, NewYork, USA',
    products: [{ sku: 'sku1', quantity: 1 }, { sku: 'sku2', quantity: 2 }],
  },
  {
    reference_number: 'Ref2',
    address: '224 Trafalgar Square',
    products: [{ sku: 'sku3', quantity: 3 }, { sku: 'sku4', quantity: 4 }, { sku: 'sku5', quantity: 5}],
  },
  {
    reference_number: 'Ref3',
    address: '212 Baker St',
    products: [{ sku: 'sku6', quantity: 4 }, { sku: 'sku7', quantity: 1 }],
  },
  {
    reference_number: 'Ref4',
    address: '123 Main St, NewYork, USA',
    products: [{ sku: 'sku8', quantity: 5 }],
  },
  {
    reference_number: 'Ref5',
    address: '224 Trafalgar Square',
    products: [{ sku: 'sku9', quantity: 2 }, { sku: 'sku10', quantity: 3 }],
  }
];

const PRODUCT_LIST: IProduct[] = [
  {
    sku: 'sku1',
    title: 'Product 1',
    price: 1,
    category: 'Category 1',
    quantity: 0,
  },
  {
    sku: 'sku2',
    title: 'Product 2',
    price: 2,
    category: 'Category 2',
    quantity: 0,
  },
  {
    sku: 'sku3',
    title: 'Product 3',
    price: 3,
    category: 'Category 3',
    quantity: 0,
  },
  {
    sku: 'sku4',
    title: 'Product 4',
    price: 4,
    category: 'Category 4',
    quantity: 0,
  },
  {
    sku: 'sku5',
    title: 'Product 5',
    price: 5,
    category: 'Category 5',
    quantity: 0,
  },
  {
    sku: 'sku6',
    title: 'Product 6',
    price: 6,
    category: 'Category 6',
    quantity: 0,
  },
  {
    sku: 'sku7',
    title: 'Product 7',
    price: 7,
    category: 'Category 7',
    quantity: 0,
  },
  {
    sku: 'sku8',
    title: 'Product 8',
    price: 8,
    category: 'Category 8',
    quantity: 0,
  },{
    sku: 'sku9',
    title: 'Product 9',
    price: 9,
    category: 'Category 9',
    quantity: 0,
  },
  {
    sku: 'sku10',
    title: 'Product 10',
    price: 10,
    category: 'Category 10',
    quantity: 0,
  }
];

export default defineComponent({
  name: 'App',
  data() {
    return {
      searchQuery: '',
      orderList: ORDER_ITEM,
      productList: PRODUCT_LIST,
    };
  },
  computed: {
    filteredOrderList(): IOrder[] {
      if (!this.searchQuery) {
        return this.orderList;
      }

      const query = this.searchQuery.toLowerCase();
      return this.orderList.filter((order: IOrder) => {
        const referenceMatch = order.reference_number
          .toLowerCase()
          .includes(query);
        const addressMatch = order.address.toLowerCase().includes(query);
        const productMatch = order.products.some((product: IProduct) => {
          const matchedProduct = this.productList.find(
            (p: IProduct) => p.sku === product.sku
          );
          return (
            matchedProduct && matchedProduct.title &&
            (matchedProduct.sku.toLowerCase().includes(query) ||
              matchedProduct.title.toLowerCase().includes(query))
          );
        });

        return referenceMatch || addressMatch || productMatch;
      });
    },
  },
  methods: {
    removeOrderItem(index: number) {
      this.orderList.splice(index, 1);
    },
  },
  components: {
    OrderItem,
  },
});
</script>


<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.search-input {
  width: -webkit-fill-available;
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;

}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 480px) {
  .app {
    padding: 10px;
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .search-input {
    font-size: 14px;
    margin-bottom: 10px;
  }
  
}
</style>