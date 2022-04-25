export default interface Invoice {
    order_id: string,
    total_price: number,
    api_key: string,
    creation_date: string,
    due_date: string,
}