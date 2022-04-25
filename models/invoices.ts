import config from "../config/config.json";
import Invoice from './../interfaces/invoice'
import storage from './storage';
import orderModel from './orders';


const invoices = {
    getInvoices: async function getInvoices(token): Promise<Invoice[]> {
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token.token
            },
            method: 'GET'
        });

        const result = await response.json();
        return result.data;

    },

    add: async function add(invoice: Partial<Invoice>) {
    
        let order = await orderModel.getOrder(invoice.order_id);
        let changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 600,
            api_key: config.api_key,
        };

        await orderModel.updateOrder(changedOrder);
        await this.createInvoice(invoice);
    },

    createInvoice: async function createInvoice(invoice: Partial<Invoice>) {
        const token = await storage.readToken();
        console.log(invoice);
        try {
            const response = await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoice),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': token.token,
                    
                },
                method: "POST"
            });
        } catch (error){
            console.log(error)
        }
        
    }
}

export default invoices;