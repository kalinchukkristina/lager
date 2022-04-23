import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import Auth from "./components/auth/Auth";
import Invoices from "./components/invoice/Invoices";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base, Typography } from './styles';
import { useState, useEffect } from 'react';
import authModel from './models/auth';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleveranser": "layers",
  "Logga in": "ios-person",
  "Faktura": "ios-book"
};



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);

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
              {isLoggedIn ?
                <Tab.Screen name="Faktura" >
                  {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
                </Tab.Screen> :
                <Tab.Screen name="Logga in">
                  {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                </Tab.Screen>
              }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

