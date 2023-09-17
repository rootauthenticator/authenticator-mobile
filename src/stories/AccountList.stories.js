import {AccountList} from '../components/AccountList';

const AccountListMeta = {
  title: 'AccountList',
  component: AccountList,
};

export default AccountListMeta;

export const Default = {
  args: {
    accounts: [
      {
        id: '00000000-0000-0000-0000-000000000000',
        text: 'hello',
        type: 'totp',
        label: {
          account: 'test@rootauthenticator.com',
          issuer: 'Authenticator',
        },
        query: {
          secret: 'secret',
        },
      },
    ],
    selectedAccounts: [],
    setSelectedAccounts: () => {},
    filter: '',
    showCheckboxes: true,
  },
};
