import { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';

export type Params = {
  maxHeight: number;
  minHeight: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export const useAnimationHeader = ({
  maxHeight,
  minHeight,
  onScroll,
}: Params) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const offset = Platform.OS === 'ios' ? maxHeight : 0;

  const headerTop = heightAnim.interpolate({
    inputRange: [-offset, maxHeight - minHeight - offset],
    outputRange: [0, -(maxHeight - minHeight)],
    extrapolate: 'clamp',
  });

  const contentInset = useMemo(() => ({ top: maxHeight }), [maxHeight]);
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

  return { headerTop, contentInset, contentOffset, handleScroll };
};
