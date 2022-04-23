export default interface Invoice {
    order_id: string,
    total_price: number,
    api_key: number,
    x-access-token: string,
    creating_date: string,
    due_date: string,

}