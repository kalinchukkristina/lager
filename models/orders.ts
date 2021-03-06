import config from "../config/config.json";
import Order from "./../interfaces/order";
import OrderItem from "./../interfaces/order_item";
import products from "./products";

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    getOrder: async function getOrder(id): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders/${id}?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    pickOrder: async function pickOrder(order: Partial<Order>) {
        await Promise.all(order.order_items.map(async (order_item:
            Partial<OrderItem>) => {
            let changedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key
            };

            await products.updateProduct(changedProduct);
        }));

        let changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        };

        await orders.updateOrder(changedOrder);
    },

    updateOrder: async function updateOrder(order: Partial<Order>) {
        await fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
    },

    getTotalSum: async function getTotalSum(id) {
        let sum = 0;
        const order = await this.getOrder(id);
        for ( let i=0; i<order.order_items.length; i++) {
            let order_sum = order.order_items[i].amount * order.order_items[i].price;
            sum += order_sum;
        };

        return sum;
    }
};

export default orders;