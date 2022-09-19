import React from 'react';
import { Animated, ScrollView, ScrollViewProps } from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';
import type { ExpandAnimationType } from '../types';

type Props = {
  scrollViewRef?: React.RefObject<ScrollView>;
  children?: React.ReactNode;
} & ExpandAnimationType &
  ScrollViewProps;

const AnimationHeaderScrollView = ({
  AnimationHeaderComponent,
  animationHeaderStyle,
  scrollViewRef,
  maxHeaderHeight,
  minHeaderHeight,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  children,
  floating,
  ...scrollViewProps
}: Props) => {
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
      <ScrollView
        ref={scrollViewRef}
        contentInset={contentInset}
        contentOffset={contentOffset}
        contentContainerStyle={[
          getContentContainerStyle(maxHeaderHeight),
          contentContainerStyle,
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={scrollEventThrottle}
        scrollIndicatorInsets={contentInset}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </>
  );
};

export default AnimationHeaderScrollView;
