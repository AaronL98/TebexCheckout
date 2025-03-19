export interface BasketInterface {
    id: string;
    products: ProductInterface[];
    couponCode: string | null;
    subTotal: number;
    salesTax: number;
    total: number;
}

export interface ProductInterface {
    name: string;
    price: number;
    image: string;
    quantity: number;
}
