import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Appearance,
  Pressable,
} from 'react-native';
import {t} from '@lingui/macro';

interface FilterbarProps {
  setShowFilterbar: (value: React.SetStateAction<boolean>) => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const Filterbar = ({
  setShowFilterbar,
  filter,
  setFilter,
}: FilterbarProps) => {
  const handleBack = () => {
    setShowFilterbar(false);
    setFilter('');
  };

  const handleClearText = () => {
    setFilter('');
  };

  const onChangeFilter = (query: string) => setFilter(query);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBack}>
        <Image
          source={require('../assets/images/arrow_back.png')}
          style={styles.arrowBackIcon}
        />
      </Pressable>
      <TextInput
        style={styles.input}
        placeholderTextColor="#4d4d4d"
        placeholder={t`Filter accounts`}
        onChangeText={onChangeFilter}
        value={filter}
        autoFocus
      />
      {filter && (
        <Pressable onPress={handleClearText}>
          <Image
            source={require('../assets/images/highlight_off.png')}
            style={styles.highlightOffIcon}
          />
        </Pressable>
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
  },
  input: {
    flexGrow: 1,
    fontSize: 20,
    color: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
  arrowBackIcon: {
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
    margin: 16,
  },
  highlightOffIcon: {
    marginRight: 16,
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
    margin: 16,
  },
});

export default Filterbar;
