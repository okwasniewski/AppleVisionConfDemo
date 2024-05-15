import {XR} from '@callstack/react-native-visionos';
import React from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Logo = () => {
  const [spaceOpen, setSpaceOpen] = React.useState(false);
  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={async () => {
        if (spaceOpen) {
          XR.endSession();
        } else {
          try {
            await XR.requestSession('Callstack', {});
          } catch {
            Alert.alert('Error', 'Failed to open immersive space');
          }
        }
        setSpaceOpen(state => !state);
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
