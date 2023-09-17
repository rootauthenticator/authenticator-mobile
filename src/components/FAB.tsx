import React from 'react';
import {StyleSheet, Pressable, View, Image, Appearance} from 'react-native';

interface FABProps {
  onPress: () => any;
}

export const FAB = ({onPress}: FABProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/crop_free.png')}
          style={styles.icon}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    borderRadius: 56 / 2,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
});

export default FAB;
