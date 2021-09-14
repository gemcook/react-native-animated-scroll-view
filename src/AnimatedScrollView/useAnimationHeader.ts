import { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';

export type Params = {
  maxHeaderHeight: number;
  minHeaderHeight: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export const useAnimationHeader = ({
  maxHeaderHeight,
  minHeaderHeight,
  onScroll,
}: Params) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const offset = Platform.OS === 'ios' ? maxHeaderHeight : 0;

  const headerTop = heightAnim.interpolate({
    inputRange: [-offset, maxHeaderHeight - minHeaderHeight - offset],
    outputRange: [0, -(maxHeaderHeight - minHeaderHeight)],
    extrapolate: 'clamp',
  });

  const contentInset = useMemo(
    () => ({ top: maxHeaderHeight }),
    [maxHeaderHeight]
  );
  const contentOffset = useMemo(
    () => ({
      x: 0,
      y: -offset,
    }),
    [offset]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      Animated.event([{ nativeEvent: { contentOffset: { y: heightAnim } } }], {
        useNativeDriver: false,
      })(event);

      onScroll?.(event);
    },
    [onScroll, heightAnim]
  );

  return {
    headerTop,
    contentInset,
    contentOffset,
    handleScroll,
  };
};
