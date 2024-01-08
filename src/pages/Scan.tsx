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
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Trans} from '@lingui/macro';
import 'react-native-get-random-values';
import {v1 as uuidv1} from 'uuid';
import keyUriParser from '../utils/keyUriParser';
import type {Account} from '../types';

const Scan = ({navigation}: {navigation: any}) => {
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isActive, setIsActive] = useState(true);
  const canScan = hasPermission === true && device !== null;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleScan = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async codes => {
      setIsActive(false);

      if (!codes.length) {
        return;
      }

      const value = codes[0].value || '';

      try {
        const result = keyUriParser(value);

        const accounts: Account[] = JSON.parse(
          (await EncryptedStorage.getItem('accounts')) || '[]',
        );

        const account: Account = {
          id: uuidv1(),
          text: value,
          ...result,
        };

        accounts.push(account);

        await EncryptedStorage.setItem('accounts', JSON.stringify(accounts));
      } catch (error) {
        console.error(error);
      }

      return navigation.navigate('Home');
    },
  });

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
      {canScan && (
        <Camera
          codeScanner={handleScan}
          device={device}
          isActive={isActive}
          style={styles.camera}
        />
      )}
      {!canScan && (
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
