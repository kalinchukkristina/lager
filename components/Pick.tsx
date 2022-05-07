import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "react-native";
import { Typography } from '../styles';
import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="Plocklista">
            <Stack.Screen name="List" component={OrderList} />
            <Stack.Screen name="Details" >
                {(screenProps) => <PickList {...screenProps} 
                setProducts={props.setProducts} /> }
            </Stack.Screen>
        </Stack.Navigator>
    );
}