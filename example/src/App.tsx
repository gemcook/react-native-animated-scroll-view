import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-animated-scroll-view';

const DATA = Array.from({ length: 30 }).map((_, index) => ({ id: index }));
const maxHeight = 150;
const minHeight = 50;

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView
        maxHeight={maxHeight}
        minHeight={minHeight}
        AnimationHeaderComponent={<View style={styles.animationHeader} />}
        showsHorizontalScrollIndicator={false}
      >
        {DATA.map((item) => {
          return (
            <View style={styles.listItem} key={item.id}>
              <Text>{item.id}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationHeader: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },
});
