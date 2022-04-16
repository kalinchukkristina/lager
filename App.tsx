import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base, Typography } from './styles';
import { useState } from 'react';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleveranser": "layers"
};

export default function App() {
  const [products, setProducts] = useState([]);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'salmon',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
            })}
            >
            <Tab.Screen name="Lager"> 
              {() => <Home products={products} setProducts={setProducts} />} 
            </Tab.Screen>
            <Tab.Screen name="Plock"> 
              {() => <Pick setProducts={setProducts} /> } 
            </Tab.Screen>
            <Tab.Screen name="Inleveranser">
              {() => <Deliveries setProducts={setProducts} /> }
              </Tab.Screen> 
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

