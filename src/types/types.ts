export interface IProduct {
    sku: string;
    title?: string;
    category?: string;
    price?: number;
    quantity: number;
  }
  
  export interface IOrder {
    reference_number: string;
    address: string;
    products: IProduct[];
  }