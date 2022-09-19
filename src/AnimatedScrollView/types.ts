import type { ViewStyle } from 'react-native';

export type ExpandAnimationType = {
  AnimationHeaderComponent?: React.ReactNode | React.ReactNode[];
  animationHeaderStyle?: ViewStyle;
  maxHeaderHeight: number;
  minHeaderHeight: number;
  floating?: boolean;
};
