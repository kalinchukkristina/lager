import { useState } from 'react';
import { ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../../styles';

import  OrderDropDown from './OrderDropDown';
import DateOrderDropDown from './DateOrderDropDown';

import Invoice from '../../interfaces/invoice';
import Order from '../../interfaces/order';

import invoiceModel from '../../models/invoices';
import orderModel from '../../models/orders';

export default function InvoicesForm({ navigation }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
//    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

    async function addInvoice() {
        await invoiceModel.add(invoice);
        navigation.navigate("Invoices", {reload: true });
    }

    return (
        <ScrollView>
            <Text style={Typography.header2 }>Ny faktura</Text>
            <Text style={Typography.header3 }>Välj en order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Text style={{ ...Typography.label }}>Datum</Text>
            <DateOrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Button
                title="Lägg till faktura"
                onPress={() => {
                    addInvoice();
                }}
            />
        </ScrollView>
    );
};