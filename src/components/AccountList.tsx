import React from 'react';
import {StyleSheet, View, Text, FlatList, Appearance} from 'react-native';
import {Trans} from '@lingui/macro';
import AccountItem from './AccountItem';
import type {Account} from '../types';

interface AccountListProps {
  navigation: any;
  accounts: Account[];
  selectedAccounts: string[];
  setSelectedAccounts: (value: React.SetStateAction<string[]>) => void;
  filter: string;
  showCheckboxes: boolean;
}

export const AccountList = ({
  accounts,
  selectedAccounts,
  setSelectedAccounts,
  filter,
  showCheckboxes,
}: AccountListProps) => {
  const filteredAccounts = accounts.filter(account => {
    return (
      account.label.account.toLowerCase().includes(filter.toLowerCase()) ||
      account.label.issuer?.toLowerCase().includes(filter.toLowerCase()) ||
      account.query.issuer?.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <View>
      <FlatList
        data={filteredAccounts}
        renderItem={({item: account}) => (
          <View style={styles.accountItem}>
            <AccountItem
              account={account}
              selectedAccounts={selectedAccounts}
              setSelectedAccounts={setSelectedAccounts}
              showCheckbox={showCheckboxes}
            />
          </View>
        )}
      />
      {!!accounts.length && !filteredAccounts.length && (
        <View style={styles.noAccountFoundContainer}>
          <Text style={styles.noAccountFoundText}>
            <Trans>No account found</Trans>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  accountItem: {
    marginTop: 16,
  },
  noAccountFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountFoundText: {
    color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
  },
});

export default AccountList;
