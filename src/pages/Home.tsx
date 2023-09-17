import React, {useEffect, useState} from 'react';
import {Appearance, StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Trans, t} from '@lingui/macro';
import EncryptedStorage from 'react-native-encrypted-storage';
import {FAB} from '../components/FAB';
import Button from '../components/Button';
import AccountList from '../components/AccountList';
import Layout from '../components/Layout';
import Appbar from '../components/Appbar';
import SelectAccounts from '../components/SelectAccounts';
import SelectedAccounts from '../components/SelectedAccounts';
import Filterbar from '../components/Filterbar';
import type {Account} from '../types';

const Home = ({navigation}: {navigation: any}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  const [showSelectAccounts, setShowSelectAccounts] = useState(false);
  const [showSelectedAccounts, setShowSelectedAccounts] = useState(false);
  const [showFilterbar, setShowFilterbar] = useState(false);

  const showAppbar =
    !showSelectAccounts && !showSelectedAccounts && !showFilterbar;

  const showCheckboxes = showSelectAccounts || showSelectedAccounts;

  const isFocused = useIsFocused();

  useEffect(() => {
    const getAccounts = async () => {
      const accounts: Account[] = JSON.parse(
        (await EncryptedStorage.getItem('accounts')) || '[]',
      );
      setAccounts(accounts);
    };

    getAccounts();
  }, [isFocused]);

  useEffect(() => {
    const updateShowStates = () => {
      if (selectedAccounts.length > 0) {
        setShowSelectedAccounts(true);
        setShowSelectAccounts(false);
      } else {
        setShowSelectedAccounts(false);
        if (showCheckboxes) {
          setShowSelectAccounts(true);
        } else {
          setShowSelectAccounts(false);
        }
      }
    };
    updateShowStates();
  }, [selectedAccounts]);

  const handleDelete = async () => {
    const accounts: Account[] = JSON.parse(
      (await EncryptedStorage.getItem('accounts')) || '[]',
    );

    const accountsAfterDeletion = accounts.filter(
      account => !selectedAccounts.includes(account.id),
    );

    await EncryptedStorage.setItem(
      'accounts',
      JSON.stringify(accountsAfterDeletion),
    );

    setAccounts(accountsAfterDeletion);
    setShowSelectedAccounts(false);
  };

  return (
    <View style={styles.container}>
      {showAppbar && (
        <Appbar
          showIcons={accounts.length > 0}
          setShowFilterbar={setShowFilterbar}
          setShowSelectAccounts={setShowSelectAccounts}
        />
      )}
      {showSelectAccounts && (
        <SelectAccounts setShowSelectAccounts={setShowSelectAccounts} />
      )}
      {showSelectedAccounts && (
        <SelectedAccounts
          counter={selectedAccounts.length}
          setShowSelectedAccounts={setShowSelectedAccounts}
          setSelectedAccounts={setSelectedAccounts}
          handleDelete={handleDelete}
        />
      )}
      {showFilterbar && (
        <Filterbar
          setShowFilterbar={setShowFilterbar}
          filter={filter}
          setFilter={setFilter}
        />
      )}
      <Layout>
        <AccountList
          navigation={navigation}
          accounts={accounts}
          selectedAccounts={selectedAccounts}
          setSelectedAccounts={setSelectedAccounts}
          showCheckboxes={showCheckboxes}
          filter={filter}
        />
        {!accounts.length && (
          <View style={styles.noAccountContainer}>
            <Text style={styles.noAccountText}>
              <Trans>You don't have any accounts yet</Trans>
            </Text>
            <Button
              onPress={() => navigation.navigate('Scan')}
              title={t`Scan a QR code`}
            />
          </View>
        )}
      </Layout>
      <View style={styles.fab}>
        <FAB onPress={() => navigation.navigate('Scan')} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  },
  noAccountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    height: '50%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
