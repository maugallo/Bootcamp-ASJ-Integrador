import { OrderDetail } from "./orderDetail";
import { Provider } from "./provider";

export interface PurchaseOrder{
    id?: number;
    details: OrderDetail[];
    orderStatus: string;
    provider: Provider;
    issueDate: Date;
    deliveryDate: Date;
    receptionInfo: string;
    total: number;
    createdAt?: Date;
    updatedAt?: Date;
}