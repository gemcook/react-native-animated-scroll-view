import React from 'react';
import { Animated, FlatListProps, FlatList, ViewStyle } from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';

type Props<ListDataType extends unknown> = {
  AnimationHeaderComponent?: React.ReactNode | React.ReactNode[];
  animationHeaderStyle?: ViewStyle;
  flatListRef?: React.RefObject<FlatList>;
  maxHeight: number;
  minHeight: number;
} & FlatListProps<ListDataType>;

const AnimationHeaderFlatList = <ListType extends unknown>({
  AnimationHeaderComponent,
  animationHeaderStyle,
  flatListRef,
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
        ref={flatListRef}
        contentInset={contentInset}
        contentOffset={contentOffset}
        contentContainerStyle={[
          getContentContainerStyle(maxHeight),
          contentContainerStyle,
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={scrollEventThrottle}
        scrollIndicatorInsets={contentInset}
        {...flatListProps}
      />
    </>
  );
};

export default AnimationHeaderFlatList;
