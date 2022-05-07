import { useState } from 'react';
import { ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../styles';
import  ProductDropDown from './ProductDropDown';
import DateDropDown from './DateDropDown';

import Delivery from '../interfaces/delivery';
import Product from '../interfaces/product';

import deliveryModel from '../models/deliveries';
import productModel from '../models/products';
import { showMessage } from 'react-native-flash-message';


export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        if (delivery.amount === 0 || delivery.comment === undefined) {
            showMessage({
                message: "Saknas",
                description: "Either amount or comment field is empty.",
                type: "warning",
            });
        } else {
            await deliveryModel.add(delivery);
            setProducts(await productModel.getProducts());
            navigation.navigate("List", { reload: true });
        }
        
    }

    return (
        <ScrollView style={Base.base }>
            <Text style={Typography.header2 }>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
                data-testid="product-dropdown"
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

                value={delivery?.amount?.toString()}
                keyboardType="numeric"
                data-testid="antal"
            />

            <Text style={{ ...Typography.label }}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                data-testid="date-dropdown"
            />

            <Text style={Typography.label }>Kommentar</Text>
            <TextInput
                style={Forms.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
                data-testid="commentar"
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
                data-testid="submitBtn"
            />
        </ScrollView>
    );
};