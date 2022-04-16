import config from "../config/config.json";


const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    updateProduct: async function updateProduct(product) {
        await fetch(`${config.base_url}/products?api_key=${config.api_key}`, {
            body: JSON.stringify(product),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
    },

    getSpecificProduct: async function getSpecificProduct(id) {
        const response = await fetch(`${config.base_url}/products/${id}?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;

    }
};

export default products;