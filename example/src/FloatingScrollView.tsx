import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from '@gemcook/react-native-animated-scroll-view';
import { DATA } from './data';

const maxHeaderHeight = 150;
const minHeaderHeight = 50;

export default function FloatingScrollView() {
  return (
    <View style={styles.container}>
      <ScrollView
        maxHeaderHeight={maxHeaderHeight}
        minHeaderHeight={minHeaderHeight}
        AnimationHeaderComponent={<View style={styles.animationHeader} />}
        showsVerticalScrollIndicator={false}
        floating
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
