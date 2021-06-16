/* eslint-disable react/require-default-props */
import React from 'react';
import { Animated, FlatListProps, FlatList, ViewStyle } from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';

type Props<ListDataType extends unknown> = {
  AnimationHeaderComponent?: React.ReactNode | React.ReactNode[];
  animationHeaderStyle?: ViewStyle;
  maxHeight: number;
  minHeight: number;
} & FlatListProps<ListDataType>;

const AnimationHeaderFlatList = <ListType extends unknown>({
  AnimationHeaderComponent,
  animationHeaderStyle,
  maxHeight,
  minHeight,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  ...flatListProps
}: Props<ListType>) => {
  const { contentInset, contentOffset, handleScroll, headerTop } =
    useAnimationHeader({
      maxHeight,
      minHeight,
      onScroll,
    });

  return (
    <>
      <Animated.View
        style={[
          styles.animatedContainer,
          { height: maxHeight },
          animationHeaderStyle,
          { transform: [{ translateY: headerTop }] },
        ]}
      >
        {AnimationHeaderComponent}
      </Animated.View>
      <FlatList
        contentInset={contentInset}
        contentOffset={contentOffset}
        contentContainerStyle={[
          getContentContainerStyle(maxHeight),
          contentContainerStyle,
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={scrollEventThrottle}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...flatListProps}
      />
    </>
  );
};

export default AnimationHeaderFlatList;
