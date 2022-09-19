import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AppBar() {
  return <View style={styles.appBarContainer} />;
}

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingTop: 24,
  },
});
