import React from 'react';
import {
  Animated,
  ViewStyle,
  SectionListProps,
  SectionList,
} from 'react-native';

import styles, { getContentContainerStyle } from './styles';

import { useAnimationHeader } from '../useAnimationHeader';

type Props<ListDataType> = {
  AnimationHeaderComponent?: React.ReactNode | React.ReactNode[];
  animationHeaderStyle?: ViewStyle;
  sectionListRef?: React.RefObject<SectionList>;
  maxHeaderHeight: number;
  minHeaderHeight: number;
} & SectionListProps<ListDataType>;

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
