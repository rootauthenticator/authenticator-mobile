import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  Appearance,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button = (props: ButtonProps) => {
  const {title, disabled, ...rest} = props;

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  title: {
    color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    fontSize: 16,
  },
});

export default Button;
