<template>
    <div class="order-address">
      <p>{{ address }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderAddress',
    props: {
      address: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  