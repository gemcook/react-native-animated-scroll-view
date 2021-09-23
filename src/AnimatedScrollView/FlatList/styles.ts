import { Platform, StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
});

export const getContentContainerStyle = (
  maxHeaderHeight: number
): ViewStyle => {
  return {
    paddingTop: Platform.OS === 'android' ? maxHeaderHeight : 0,
  };
};

export default styles;
