import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Item {
  name: string;
}

interface CocktailItemProps {
  item: Item;
}

const CocktailItem: React.FC<CocktailItemProps> = ({ item }) => {
  return <Text style={styles.item}>{item.name}</Text>;
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 24,
  },
});

export default CocktailItem;
