import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import {Item} from '../data';

interface StashItemProps {
  item: Item;
  onPress: (item: Item) => void;
}
function StashItem({item, onPress}: StashItemProps): React.JSX.Element {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.touchable}>
      <Image src={item.image} style={styles.image} />
      <View>
        <Text style={styles.text}>{item.title}</Text>
        <Text numberOfLines={1} style={styles.subtitle}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const isVision = Platform.OS === 'ios' && Platform.isVision;

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: isVision ? 20 : 10,
    borderRadius: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  text: {
    fontWeight: 'bold',
    color: isVision ? 'white' : 'black',
    fontSize: isVision ? 25 : 18,
  },
  subtitle: {
    color: isVision ? 'white' : 'black',
    fontSize: isVision ? 15 : 12,
    width: isVision ? 'auto' : 200,
  },
});

export default StashItem;
