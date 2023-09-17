import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Appearance,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {Plural, t} from '@lingui/macro';

interface SelectedAccountsProps {
  counter: number;
  setShowSelectedAccounts: (value: React.SetStateAction<boolean>) => void;
  handleDelete: () => void;
  setSelectedAccounts: (value: React.SetStateAction<string[]>) => void;
}

export const SelectedAccounts = ({
  counter,
  setShowSelectedAccounts,
  handleDelete,
  setSelectedAccounts,
}: SelectedAccountsProps) => {
  const handleClose = () => {
    setShowSelectedAccounts(false);
    setSelectedAccounts([]);
  };

  const handleConfirmDelete = () =>
    Alert.alert(t`Delete`, t`This action cannot be undone.`, [
      {
        text: t`Cancel`,
        style: 'cancel',
      },
      {text: t`Confirm`, onPress: handleDelete},
    ]);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleClose}>
        <Image
          source={require('../assets/images/close.png')}
          style={styles.closeIcon}
        />
      </Pressable>
      <Text style={styles.text}>
        <Plural value={counter} one="# selected" other="# selected" />
      </Text>
      <Pressable onPress={handleConfirmDelete}>
        <Image
          source={require('../assets/images/delete.png')}
          style={styles.deleteIcon}
        />
      </Pressable>
    </View>
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
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
});

export default SelectedAccounts;
