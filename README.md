# OrderItem Component

The OrderItem component is a Vue 3 component that displays an order reference, address, and a list of products. It is designed to be responsive and suitable for mobile viewing. In mobile view the order items collapse. You can still click on orderitems title to expand

## Component Structure

The OrderItem component is composed of the following sub-components:

- AppComponent: Wrapper component which wraps all functionality
- OrderItemComponent: Represents each individual product in the product list.
- AddressComponent: Displays the address details of the order.
- ProductListComponent: Displays the list of products in the order.
- ProductItemComponent: Represents each individual product in the product list.

## Installation

```
npm install
npm run serve
```

## Features

The OrderItem component provides the following features:

- Displaying order reference, address, and product list.
- Responsive design for mobile devices.
- Removing order items from the list.
- Adding products from an order.
- Remove products from an order.
- Searching the list by order reference, product information, or address.
