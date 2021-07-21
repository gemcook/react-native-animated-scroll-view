import React from 'react';
import { Animated, ScrollView, ViewStyle, ScrollViewProps } from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';

type Props = {
  AnimationHeaderComponent?: React.ReactNode | React.ReactNode[];
  animationHeaderStyle?: ViewStyle;
  maxHeight: number;
  minHeight: number;
  children?: React.ReactNode;
} & ScrollViewProps;

const AnimationHeaderScrollView = ({
  AnimationHeaderComponent,
  animationHeaderStyle,
  maxHeight,
  minHeight,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  children,
  ...scrollViewProps
}: Props) => {
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
      <ScrollView
        contentInset={contentInset}
        contentOffset={contentOffset}
        contentContainerStyle={[
          getContentContainerStyle(maxHeight),
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
