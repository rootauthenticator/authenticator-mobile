import React from 'react';
import {StyleSheet, Pressable, Image, Appearance} from 'react-native';

interface CheckboxProps {
  onPress: () => any;
  isChecked: boolean;
}

export const Checkbox = ({onPress, isChecked}: CheckboxProps) => {
  return (
    <Pressable onPress={onPress}>
      {isChecked ? (
        <Image
          source={require('../assets/images/check_box.png')}
          style={styles.icon}
        />
      ) : (
        <Image
          source={require('../assets/images/check_box_outline_blank.png')}
          style={styles.icon}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
  },
});

export default Checkbox;
