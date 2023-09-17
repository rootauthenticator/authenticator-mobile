import {SelectedAccounts} from '../components/SelectedAccounts';

const SelectedAccountsMeta = {
  title: 'SelectedAccounts',
  component: SelectedAccounts,
};

export default SelectedAccountsMeta;

export const Default = {
  args: {
    counter: 1,
    setShowSelectedAccounts: () => {},
    handleDelete: () => {},
    setSelectedAccounts: () => {},
  },
};
