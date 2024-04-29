import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {BlurView} from '@react-native-community/blur';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button = ({title, onPress, disabled}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.touchable}
      onPress={onPress}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
  },
  titleText: {
    // @ts-ignore-next-line Platform.isVision is available from 0.74
    color: Platform.isVision ? 'white' : 'black',
    fontSize: 16,
    marginRight: 5,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  absolute: {
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
