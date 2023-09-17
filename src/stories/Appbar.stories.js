import {Appbar} from '../components/Appbar';

const AppbarMeta = {
  title: 'Appbar',
  component: Appbar,
};

export default AppbarMeta;

export const Default = {
  args: {
    showIcons: true,
    setShowFilterbar: () => {},
    setShowSelectAccounts: () => {},
  },
};
