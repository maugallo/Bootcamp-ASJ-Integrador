import { OrderDetail } from "./orderDetail";
import { Provider } from "./provider";

export interface Order{
    orderNumber: number;
    issueDate: Date;
    deliveryDate: Date;
    receptionInfo: string;
    provider: Provider;
    orderDetails: OrderDetail[];
    total: number;
    enabled: boolean;
}