import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { ScrollView } from '@gemcook/react-native-animated-scroll-view';
import { DATA } from './data';
import AppBar from './AppBar';

const maxHeaderHeight = 150;
const minHeaderHeight = 50;

export default function DefaultScrollView() {
  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer} />
      <View style={styles.container}>
        <ScrollView
          maxHeaderHeight={maxHeaderHeight}
          minHeaderHeight={minHeaderHeight}
          AnimationHeaderComponent={<AppBar />}
          showsVerticalScrollIndicator={false}
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
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: 'red',
  },
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
