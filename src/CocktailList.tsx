import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { GET_COCKTAILS } from '../data/queries';
import CocktailItem from './CocktailItem';

interface CocktailListProps {}

const CocktailList: React.FC<CocktailListProps> = () => {
  const {loading, error, data} = useQuery(GET_COCKTAILS);

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>

  return (
    <View style={styles.container}>
      <FlatList
        data={data.cocktails}
        renderItem={({ item }) => <CocktailItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
  },
});

export default CocktailList;
