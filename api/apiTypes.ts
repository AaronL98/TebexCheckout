export interface Basket {
    id: string;
    products: Product[];
    couponCode: string | null;
    subTotal: number;
    salesTax: number;
    total: number;
}

export interface Product {
    name: string;
    price: number;
    image: string;
    quantity: number;
}
