import { ScrollView } from "@gemcook/react-native-animated-scroll-view";
import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppBar from "./AppBar";
import { DATA } from "./data";

const maxHeaderHeight = 150;
const minHeaderHeight = 50;

export default function FloatingScrollView() {
  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer} />
      <ScrollView
        maxHeaderHeight={maxHeaderHeight}
        minHeaderHeight={minHeaderHeight}
        AnimationHeaderComponent={<AppBar />}
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
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "red",
  },
  container: {
    flex: 1,
  },
  listItem: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  animationHeader: {
    backgroundColor: "red",
    height: "100%",
    width: "100%",
  },
});
