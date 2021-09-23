import React from 'react';
import { Animated, ScrollView, ViewStyle, ScrollViewProps } from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';

type Props = {
  AnimationHeaderComponent?: React.ReactNode | React.ReactNode[];
  animationHeaderStyle?: ViewStyle;
  maxHeaderHeight: number;
  minHeaderHeight: number;
  children?: React.ReactNode;
} & ScrollViewProps;

const AnimationHeaderScrollView = ({
  AnimationHeaderComponent,
  animationHeaderStyle,
  maxHeaderHeight,
  minHeaderHeight,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  children,
  ...scrollViewProps
}: Props) => {
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
      <ScrollView
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
