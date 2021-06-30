import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-animated-header-view';

const DATA = Array.from({ length: 30 }).map((_, index) => ({ id: index }));
const maxHeight = 150;
const minHeight = 50;

export default function App() {
  console.log(DATA);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={DATA}
        maxHeight={maxHeight}
        minHeight={minHeight}
        keyExtractor={({ id }) => `${id}`}
        AnimationHeaderComponent={<View style={styles.animationHeader} />}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  listItem: {
    width: '100%',
    height: 60,
  },
  animationHeader: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },
});
