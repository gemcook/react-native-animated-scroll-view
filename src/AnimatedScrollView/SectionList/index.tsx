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
  sectionListRef?: React.RefObject<SectionList>;
  maxHeight: number;
  minHeight: number;
} & SectionListProps<ListDataType>;

const AnimationHeaderSectionList = <ListType extends unknown>({
  AnimationHeaderComponent,
  animationHeaderStyle,
  maxHeight,
  minHeight,
  sectionListRef,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  ...sectionListProps
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
      <SectionList
        ref={sectionListRef}
        contentInset={contentInset}
        contentOffset={contentOffset}
        contentContainerStyle={[
          getContentContainerStyle(maxHeight),
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
