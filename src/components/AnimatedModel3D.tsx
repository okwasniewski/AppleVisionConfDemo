import React, {useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {Model3dView} from 'react-native-model3d';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';
import {View, Platform, StyleSheet} from 'react-native';

const AnimatedModel3DView = Animated.createAnimatedComponent(Model3dView);
const DURATION = 15000;

interface AnimatedModel3DProps {
  source: string;
}

const AnimatedModel3D = ({source}: AnimatedModel3DProps) => {
  const rotate = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const pan = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
    })
    .onChange(event => {
      offsetX.value = event.translationX;
    });

  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        isDragging.value
          ? {
              rotateY: `${interpolate(
                offsetX.value,
                [-100, 100],
                [-180, 180],
              )}deg`,
            }
          : {rotateY: `${rotate.value}deg`},
      ],
    };
  });

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    rotate.value = withRepeat(
      withSequence(
        withTiming(1080, {duration: DURATION, easing: Easing.linear}),
        withTiming(0, {duration: DURATION, easing: Easing.linear}),
      ),
      -1,
      true,
    );
  }, [isLoaded, rotate]);

  if (!(Platform.OS === 'ios' && Platform.isVision)) {
    return null;
  }

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <AnimatedModel3DView
          source={source}
          aspectRatio="fit"
          onLoad={() => {
            setIsLoaded(true);
          }}
          style={[rotationStyle, styles.model3d]}
        />
      </GestureDetector>
    </View>
  );
};

export default AnimatedModel3D;

const styles = StyleSheet.create({
  model3d: {width: 400, height: 400, transformOrigin: 'center center 150px'},
  switchContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 60,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'semibold',
  },
});
