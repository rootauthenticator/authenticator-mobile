import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 16,
  },
});

export default Layout;
