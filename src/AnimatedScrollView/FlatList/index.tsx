import React from 'react';
import { Animated, FlatListProps, FlatList } from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';
import type { ExpandAnimationType } from '../types';

type Props<ListDataType> = {
  flatListRef?: React.RefObject<FlatList>;
} & ExpandAnimationType &
  FlatListProps<ListDataType>;

const AnimationHeaderFlatList = <ListType,>({
  AnimationHeaderComponent,
  animationHeaderStyle,
  flatListRef,
  maxHeaderHeight,
  minHeaderHeight,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  progressViewOffset,
  floating,
  ...flatListProps
}: Props<ListType>) => {
  const { contentInset, contentOffset, handleScroll, headerTop } =
    useAnimationHeader({
      maxHeaderHeight,
      minHeaderHeight,
      onScroll,
      floating,
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
        ref={flatListRef}
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
