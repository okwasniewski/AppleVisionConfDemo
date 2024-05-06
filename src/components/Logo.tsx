import {XR} from '@callstack/react-native-visionos';
import React from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

let isImmersiveSpaceOpen = false;

const Logo = () => {
  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={async () => {
        if (isImmersiveSpaceOpen) {
          await XR.endSession();
          isImmersiveSpaceOpen = false;
          return;
        }

        try {
          await XR.requestSession('Callstack', {});
          isImmersiveSpaceOpen = true;
        } catch {
          Alert.alert('Error', 'Failed to open immersive space');
        }
      }}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </TouchableOpacity>
  );
};

export default Logo;

const isVision = Platform.OS === 'ios' && Platform.isVision;

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 20,
  },
  logo: {
    width: isVision ? 50 : 30,
    height: isVision ? 50 : 30,
    borderRadius: 20,
  },
});
