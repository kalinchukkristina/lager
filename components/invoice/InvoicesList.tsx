import { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

import { ScrollView, View, Text, Button } from "react-native";
import { Base, Typography } from '../../styles';
import invoiceModel from '../../models/invoices';
import storage from "../../models/storage";

export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        const token = await storage.readToken();
        try {
            setAllInvoices(await invoiceModel.getInvoices(token));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    const listOfInvoices = allInvoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{invoice.order_id}</DataTable.Cell>
              <DataTable.Cell>{invoice.name}</DataTable.Cell>
              <DataTable.Cell>{invoice.total_price}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>OrderId</DataTable.Title>
                    <DataTable.Title>Kundnamn</DataTable.Title>
                    <DataTable.Title>Summa</DataTable.Title>
                </DataTable.Header>
                {listOfInvoices}
            </DataTable>
            <Button
                title="Lägga till en faktura"
                onPress={() => {
                    navigation.navigate('InvoicesForm');
                }}
            />
            <Button
                title="Logga ut"
                onPress={() => {
                    setIsLoggedIn(false);
                    storage.deleteToken();
                }}
            />
        </ScrollView>
    );
}