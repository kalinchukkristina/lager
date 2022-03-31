import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/warehouse.jpg';
import Stock from './components/Stock';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
        <Text style={{color: '#333', fontSize: 46, textAlign:'center', marginTop:'3%'}}>Lager-Appen</Text>
        <Image source={warehouse} style={{ width: 'auto', height: 240, margin:'5%'}} />
        <Stock />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a7ccdb',
  },
  base: {
    flex: 1,
    backgroundColor: '#3493ba',
    paddingLeft: 12,
    paddingRight: 12,
  },

});
