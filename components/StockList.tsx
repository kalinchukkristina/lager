import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Base } from "../styles";
import productModel from './../models/products';


export default function StockList({ products, setProducts }) {
    useEffect(async () => {
      setProducts(await productModel.getProducts());
    }, []);
  
    const list = products.map((product, index) => {
      return <Text 
              key={index} 
              style={Base.prod}
              >
                { product.name } - { product.stock }
              </Text>
    });
  
    return (
      <View>
        {list}
      </View>
    );
  }