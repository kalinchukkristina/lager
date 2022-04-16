import config from "../config/config.json";
import Delivery from "../interfaces/delivery";
import products from "./products";

const deliveries = {
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    add: async function add(delivery: Partial<Delivery>) {

        let prod = await products.getSpecificProduct(delivery.product_id);
        let currentAmount = prod.stock;

        let changedProduct = {
                id: delivery.product_id,
                name: delivery.product_name,
                api_key: config.api_key,
                stock: currentAmount + delivery.amount,
            };

        await products.updateProduct(changedProduct);

        let newDelivery = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            delivery_date: delivery.delivery_date,
            comment: delivery.comment,
            api_key: config.api_key,
        }

        await deliveries.createDelivery(newDelivery);
    },

    createDelivery: async function createDelivery(delivery: Partial<Delivery>) {
        await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(delivery),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
    }
};

export default deliveries;
