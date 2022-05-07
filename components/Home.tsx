import { Image, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import warehouse from './../assets/warehouse.jpg';
import Stock from './Stock';
import { Base, Typography } from './../styles';

export default function Home({ products, setProducts}) {
  return (
    <ScrollView style={Base.container}>
      <Text style={Typography.header1}>Lager-Appen</Text>
      <Image source={warehouse} style={Base.lagerImage} />
      <Stock products={products} setProducts={setProducts} />
    </ScrollView>
  );
}
