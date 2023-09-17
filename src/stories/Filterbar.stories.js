import {Filterbar} from '../components/Filterbar';

const FilterbarMeta = {
  title: 'Filterbar',
  component: Filterbar,
};

export default FilterbarMeta;

export const Default = {
  args: {
    setShowFilterbar: () => {},
    filter: '',
    setFilter: () => null,
  },
};
