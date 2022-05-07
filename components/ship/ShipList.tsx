import { View, Text, Button } from "react-native";
import { useState, useEffect } from 'react';
import { Typography } from '../../styles';
import orderModel from '../../models/orders';

export default function ShipList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allPackedOrders, setAllPackedOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllPackedOrders(await orderModel.getOrders())
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfPackedOrders = allPackedOrders
    .filter(order => order.status === "Packad")
    .map((order, index) => {
        return <Button
            accessibilityLabel={`View delivery details`}
            title={order.name}
            key={index}
            onPress={() => {
                navigation.navigate('Order', {
                    order: order
                });
            }}
        />
    });

    return (
        <View>
            <Text style={Typography.header2}>Ordrar redo att skickas:</Text>
            {listOfPackedOrders}
        </View>
    )
}