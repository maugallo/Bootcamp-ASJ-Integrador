import { OrderDetail } from "./orderDetail";
import { Provider } from "./provider";

export interface PurchaseOrder{
    id?: number;
    details: OrderDetail[];
    status: string;
    provider: Provider;
    issueDate: string;
    deliveryDate: string;
    receptionInfo: string;
    total: number;
    createdAt?: Date;
    updatedAt?: Date;
}