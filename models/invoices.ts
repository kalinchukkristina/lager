import config from "../config/config.json";
import Invoice from './../interfaces/invoice'
import storage from './storage';


const invoices = {
    getInvoices: async function getInvoices(token): Promise<Invoice[]> {
        console.log(token.token);
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token.token
            },
            method: 'GET'
        });

        const result = await response.json();
        console.log(result);
        return result.data;

    },

    add: async function add(invoice: Partial<Invoice>) {
        console.log(invoice);
    }
};

export default invoices;