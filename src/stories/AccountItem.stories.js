import {AccountItem} from '../components/AccountItem';

const AccountItemMeta = {
  title: 'AccountItem',
  component: AccountItem,
};

export default AccountItemMeta;

export const Default = {
  args: {
    account: {
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
    selectedAccounts: [],
    setSelectedAccounts: () => {},
    showCheckbox: true,
  },
};
