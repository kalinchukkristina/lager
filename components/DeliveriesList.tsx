import { useState, useEffect } from 'react';

import { ScrollView, View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import deliveryModel from '../models/deliveries';


export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        try {
            setAllDeliveries(await deliveryModel.getDeliveries());
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries.map((delivery, index) => {
        return <View
            key={index}
            style={Base.delivery}
        >
            <Text style={Typography.leverans}> { delivery.product_name}: { delivery.amount } st. </Text>
            <Text> Levererad: { delivery.delivery_date } </Text>
            <Text> Kommentar: {delivery.comment } </Text>
        </View>
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            { listOfDeliveries }
            <Button
                title="Skapa ny inleverans"
                accessibilityLabel={`Add new delivery`}
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}
