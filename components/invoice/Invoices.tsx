import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import InvoicesList from './InvoicesList';
import InvoicesForm from './InvoicesForm';

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="Invoices">
            <Stack.Screen name="Invoices" >
                {(screenProps) => <InvoicesList {...screenProps} 
                setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="InvoicesForm" >
                {(screenProps) => <InvoicesForm {...screenProps} 
                setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
