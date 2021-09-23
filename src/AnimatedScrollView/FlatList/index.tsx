import React from 'react';
import { Animated, FlatListProps, FlatList, ViewStyle } from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';

type Props<ListDataType extends unknown> = {
  AnimationHeaderComponent?: React.ReactNode | React.ReactNode[];
  animationHeaderStyle?: ViewStyle;
  maxHeaderHeight: number;
  minHeaderHeight: number;
} & FlatListProps<ListDataType>;

const AnimationHeaderFlatList = <ListType extends unknown>({
  AnimationHeaderComponent,
  animationHeaderStyle,
  maxHeaderHeight,
  minHeaderHeight,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  progressViewOffset,
  ...flatListProps
}: Props<ListType>) => {
  const { contentInset, contentOffset, handleScroll, headerTop } =
    useAnimationHeader({
      maxHeaderHeight,
      minHeaderHeight,
      onScroll,
    });

  return (
    <>
      <Animated.View
        style={[
          styles.animatedContainer,
          { height: maxHeaderHeight },
          animationHeaderStyle,
          { transform: [{ translateY: headerTop }] },
        ]}
      >
        {AnimationHeaderComponent}
      </Animated.View>
      <FlatList
        contentInset={contentInset}
        progressViewOffset={progressViewOffset || maxHeaderHeight}
        contentOffset={contentOffset}
        contentContainerStyle={[
          getContentContainerStyle(maxHeaderHeight),
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
