import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  Appearance,
} from 'react-native';
import {Authenticator} from '@otplib/core';
import {keyDecoder, keyEncoder} from '@otplib/plugin-base32-enc-dec';
import {createDigest, createRandomBytes} from '@otplib/plugin-crypto-js';
import {Buffer} from 'buffer';
import Clipboard from '@react-native-clipboard/clipboard';
import Checkbox from './Checkbox';
import type {Account} from '../types';

global.Buffer = Buffer;

const authenticator = new Authenticator({
  createDigest,
  createRandomBytes,
  keyDecoder,
  keyEncoder,
});

interface AccountItemProps {
  account: Account;
  selectedAccounts: string[];
  setSelectedAccounts: (value: React.SetStateAction<string[]>) => void;
  showCheckbox: boolean;
}

export const AccountItem = ({
  account,
  selectedAccounts,
  setSelectedAccounts,
  showCheckbox,
}: AccountItemProps) => {
  const token = authenticator.generate(account.query.secret);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    if (timeRemaining === 30) {
      setShowToken(false);
    }
  }, [timeRemaining]);

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimeRemaining(authenticator.timeRemaining());
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return (
    <Item
      showToken={showToken}
      setShowToken={setShowToken}
      primaryText={
        showToken ? token : account.label.issuer || account.query.issuer || ''
      }
      secondaryText={!showToken ? account.label.account : ''}
      selectedAccounts={selectedAccounts}
      setSelectedAccounts={setSelectedAccounts}
      showCheckbox={showCheckbox}
      accountId={account.id}
    />
  );
};

interface ItemProps {
  showToken: boolean;
  setShowToken: (value: React.SetStateAction<boolean>) => void;
  primaryText: string;
  secondaryText?: string;
  selectedAccounts: string[];
  setSelectedAccounts: (value: React.SetStateAction<string[]>) => void;
  showCheckbox: boolean;
  accountId: Account['id'];
}

const Item = ({
  showToken,
  setShowToken,
  primaryText,
  secondaryText,
  selectedAccounts,
  setSelectedAccounts,
  showCheckbox,
  accountId,
}: ItemProps) => {
  const handleCheckbox = () => {
    const newSelectedAccounts = selectedAccounts.includes(accountId)
      ? selectedAccounts.filter(
          selectedAccountId => selectedAccountId !== accountId,
        )
      : [...selectedAccounts, accountId];
    setSelectedAccounts(newSelectedAccounts);
  };

  const handleShowToken = () => {
    if (!showToken) {
      setShowToken(true);
    }
  };

  const handleCopyToken = () => {
    if (showToken) {
      Clipboard.setString(primaryText);
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handleShowToken}
      onLongPress={handleCopyToken}>
      <View style={styles.wrapper}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/timelapse.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.textContainer}>
          {primaryText && <Text style={styles.primaryText}>{primaryText}</Text>}
          {secondaryText ? (
            <Text style={styles.secondaryText}>{secondaryText}</Text>
          ) : null}
        </View>
        {showCheckbox && (
          <View style={styles.checkboxContainer}>
            <Checkbox
              onPress={handleCheckbox}
              isChecked={selectedAccounts.includes(accountId)}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    borderWidth: 1,
    borderRadius: 5,
    height: 65,
  },
  wrapper: {
    flexDirection: 'row',
  },
  iconContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  primaryText: {
    color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
  },
  checkboxContainer: {
    alignSelf: 'center',
    marginRight: 16,
  },
});

export default AccountItem;
