import { useState } from 'react';
import { ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../styles';
import  ProductDropDown from './ProductDropDown';
import DateDropDown from './DateDropDown';

import Delivery from '../interfaces/delivery';
import Product from '../interfaces/product';

import deliveryModel from '../models/deliveries';
import productModel from '../models/products';


export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    console.log(delivery);

    async function addDelivery() {
        await deliveryModel.add(delivery);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    return (
        <ScrollView style={Base.base }>
            <Text style={Typography.header2 }>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={Typography.label }>Antal</Text>
            <TextInput
                style={Forms.input }

                onChangeText={(content: string) => {
                    let numericValue;
                    if (content) {
                        numericValue = parseInt(content)
                    } else {
                        numericValue = 0
                    }
                    setDelivery({ ...delivery, amount: numericValue})
                }}

                value={delivery.amount.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.label }}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />

            <Text style={Typography.label }>Kommentar</Text>
            <TextInput
                style={Forms.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};