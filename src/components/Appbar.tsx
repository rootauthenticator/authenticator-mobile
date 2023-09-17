import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Appearance,
  Image,
  Pressable,
} from 'react-native';

interface SelectedAccountsProps {
  showIcons: boolean;
  setShowFilterbar: (value: React.SetStateAction<boolean>) => void;
  setShowSelectAccounts: (value: React.SetStateAction<boolean>) => void;
}

export const Appbar = ({
  showIcons,
  setShowFilterbar,
  setShowSelectAccounts,
}: SelectedAccountsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Root Authenticator</Text>
      {showIcons && (
        <View style={styles.iconsContainer}>
          <Pressable
            style={styles.searchIconContainer}
            onPress={() => setShowFilterbar(true)}>
            <Image
              source={require('../assets/images/search.png')}
              style={styles.searchIcon}
            />
          </Pressable>
          <Pressable
            style={styles.editIconContainer}
            onPress={() => setShowSelectAccounts(true)}>
            <Image
              source={require('../assets/images/create.png')}
              style={styles.editIcon}
            />
          </Pressable>
        </View>
      )}
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
  title: {
    flexGrow: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  searchIconContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  editIconContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
  editIcon: {
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
});

export default Appbar;
