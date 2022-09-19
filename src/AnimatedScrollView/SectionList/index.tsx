import React from 'react';
import { Animated, SectionListProps, SectionList } from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';
import type { ExpandAnimationType } from '../types';

type Props<ListDataType> = {
  sectionListRef?: React.RefObject<SectionList>;
} & ExpandAnimationType &
  SectionListProps<ListDataType>;

const AnimationHeaderSectionList = <ListType,>({
  AnimationHeaderComponent,
  animationHeaderStyle,
  sectionListRef,
  maxHeaderHeight,
  minHeaderHeight,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  progressViewOffset,
  floating,
  ...sectionListProps
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
      <SectionList
        ref={sectionListRef}
        progressViewOffset={progressViewOffset || maxHeaderHeight}
        contentInset={contentInset}
        contentOffset={contentOffset}
        contentContainerStyle={[
          getContentContainerStyle(maxHeaderHeight),
          contentContainerStyle,
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={scrollEventThrottle}
        {...sectionListProps}
      />
    </>
  );
};

export default AnimationHeaderSectionList;
