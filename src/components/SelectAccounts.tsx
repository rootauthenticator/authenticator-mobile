import React from 'react';
import {StyleSheet, Text, Appearance, Image, Pressable} from 'react-native';
import {Trans} from '@lingui/macro';

interface SelectAccountsProps {
  setShowSelectAccounts: (value: React.SetStateAction<boolean>) => void;
}

export const SelectAccounts = ({
  setShowSelectAccounts,
}: SelectAccountsProps) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowSelectAccounts(false)}>
      <Image
        source={require('../assets/images/close.png')}
        style={styles.closeIcon}
      />
      <Text style={styles.text}>
        <Trans>Select accounts</Trans>
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    height: 56,
    padding: 16,
  },
  text: {
    flexGrow: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
  closeIcon: {
    marginRight: 16,
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
});

export default SelectAccounts;
