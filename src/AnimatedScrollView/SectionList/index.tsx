/* eslint-disable react/require-default-props */
import React from 'react';
import {
  Animated,
  ViewStyle,
  SectionListProps,
  SectionList,
} from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';

type Props<ListDataType extends unknown> = {
  AnimationHeaderComponent?: React.ReactNode | React.ReactNode[];
  animationHeaderStyle?: ViewStyle;
  maxHeaderHeight: number;
  minHeaderHeight: number;
} & SectionListProps<ListDataType>;

const AnimationHeaderSectionList = <ListType extends unknown>({
  AnimationHeaderComponent,
  animationHeaderStyle,
  maxHeaderHeight,
  minHeaderHeight,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  ...sectionListProps
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
      <SectionList
        contentInset={contentInset}
        contentOffset={contentOffset}
        contentContainerStyle={[
          getContentContainerStyle(maxHeaderHeight),
          contentContainerStyle,
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={scrollEventThrottle}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...sectionListProps}
      />
    </>
  );
};

export default AnimationHeaderSectionList;
