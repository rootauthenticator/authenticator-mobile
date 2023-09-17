import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Trans} from '@lingui/macro';
import 'react-native-get-random-values';
import {v1 as uuidv1} from 'uuid';
import keyUriParser from '../utils/keyUriParser';
import type {Account} from '../types';

const Scan = ({navigation}: {navigation: any}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleScan = async ({data}: {data: any}) => {
    setScanned(true);

    try {
      const result = keyUriParser(data);

      const accounts: Account[] = JSON.parse(
        (await EncryptedStorage.getItem('accounts')) || '[]',
      );

      const account: Account = {
        id: uuidv1(),
        text: data,
        ...result,
      };

      accounts.push(account);

      await EncryptedStorage.setItem('accounts', JSON.stringify(accounts));
    } catch (error) {
      console.error(error);
    }

    return navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/arrow_back.png')}
            style={styles.arrowBackIcon}
          />
        </Pressable>
      </View>
      {hasPermission === true && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScan}
          style={styles.camera}
        />
      )}
      {hasPermission === false && (
        <View style={styles.noPermissionCameraContainer}>
          <Text style={styles.noPermissionCameraText}>
            <Trans>
              The app needs access to the camera to scan for QR codes.
            </Trans>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
  },
  camera: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    height: 56,
  },
  arrowBackIcon: {
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
    margin: 16,
  },
  noPermissionCameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPermissionCameraText: {
    color: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
});

export default Scan;
