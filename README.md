# react-native-animated-scroll-view

A component that animates the header when the content is scrolled.

![example1](https://user-images.githubusercontent.com/41561321/129012122-6677bdc3-6fb5-4f08-9104-028be504cf42.gif)

## Installation

```sh
npm install @gemcook/react-native-animated-scroll-view
```

or yarn

```sh
yarn add @gemcook/react-native-animated-scroll-view
```

## Usage

Simple to use

```tsx
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-animated-scroll-view';

const DATA = Array.from({ length: 30 }).map((_, index) => ({ id: index }));
const maxHeaderHeight = 150;
const minHeaderHeight = 50;

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView
        maxHeaderHeight={maxHeaderHeight}
        minHeaderHeight={minHeaderHeight}
        AnimationHeaderComponent={<View style={styles.animationHeader} />}
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
```

It can be used not only for `ScrollView`, but also for `FlatList` or `SectionList`

```tsx
import {
  ScrollView,
  FlatList,
  SectionList,
} from 'react-native-animated-scroll-view';
```

## Props

Each component inherits the Props of the original component

| Props                    | type      | description               | required | default |
| :----------------------- | :-------- | :------------------------ | :------- | :------ |
| AnimationHeaderComponent | ReactNode | AnimationHeader component | false    | --      |
| animationHeaderStyle     | ViewStyle | AnimationHeader style     | false    | --      |
| maxHeaderHeight          | number    | Header maximum height     | true     | --      |
| minHeaderHeight          | number    | Header minimum height     | true     | --      |
| floating                 | boolean   | Whether or not the header should appear immediately when the user scrolls upward     | false     | false      |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
