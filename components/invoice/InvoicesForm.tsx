import config from '../../config/config.json';
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

    async function addInvoice() {
        invoice.total_price = await orderModel.getTotalSum(invoice.order_id);
        invoice.api_key = config.api_key;
        await invoiceModel.add(invoice);
        navigation.navigate("Invoices", { reload: true });
    }

    return (
        <ScrollView>
            <Text style={Typography.header2 }>Ny faktura</Text>
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