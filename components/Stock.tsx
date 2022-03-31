import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";


function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) => <Text key={index} 
  style={{color:'#bbe0f0', fontSize: 20, marginTop:'3%'}}>{ product.name } - { product.stock }</Text>);

  return (
    <View>
      {list}
    </View>
  );
}

  export default function Stock() {
    return (
      <View>
        <Text style={{color: '#333', fontSize: 32, textAlign: 'center'}}>Lagerförteckning</Text>
        <StockList/>
      </View>
    );
  }