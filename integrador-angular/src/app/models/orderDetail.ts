import { Product } from "./product";
import { PurchaseOrder } from "./purchaseOrder";

export interface OrderDetail{
    id?: number;
    purchaseOrder?: PurchaseOrder;
    product: Product;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}