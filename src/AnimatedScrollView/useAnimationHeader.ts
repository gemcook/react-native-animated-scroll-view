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
  floating?: boolean;
};

export const useAnimationHeader = ({
  maxHeaderHeight,
  minHeaderHeight,
  onScroll,
  floating = false,
}: Params) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const offset = Platform.OS === 'ios' ? maxHeaderHeight : 0;

  const headerTop = useMemo(() => {
    if (floating) {
      return Animated.diffClamp(
        Animated.multiply(heightAnim, -1),
        minHeaderHeight - maxHeaderHeight,
        0
      );
    }

    return heightAnim.interpolate({
      inputRange: [-offset, maxHeaderHeight - minHeaderHeight - offset],
      outputRange: [0, -(maxHeaderHeight - minHeaderHeight)],
      extrapolate: 'clamp',
    });
  }, [floating, offset, maxHeaderHeight, minHeaderHeight, heightAnim]);

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
        listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (floating) {
            const offsetY = event.nativeEvent.contentOffset.y;
            if (offsetY < -maxHeaderHeight) {
              heightAnim.extractOffset();
            }
          }
        },
      })(event);

      onScroll?.(event);
    },
    [onScroll, heightAnim, maxHeaderHeight, floating]
  );

  return {
    headerTop,
    contentInset,
    contentOffset,
    handleScroll,
  };
};
