import { useState, useEffect } from 'react';

import { Picker } from '@react-native-picker/picker';
import orderModel from '../../models/orders';
import Order from '../../interfaces/order';

function OrderDropDown(props) {
    const [orders, setOrder] = useState<Order[]>([]);
    let orderHash: any = {};

    useEffect(async () => {
        setOrder(await orderModel.getOrders());
    }, []);

    const orderList = orders.map((order, index) => {
        orderHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id}/>
    });

    return (
        <Picker
        selectedValue={props.invoice?.id}
        onValueChange={(itemValue) => {
            props.setInvoice({ ...props.invoice, order_id: itemValue });
        }}>
        {orderList}
        </Picker>
    );
};

export default OrderDropDown;