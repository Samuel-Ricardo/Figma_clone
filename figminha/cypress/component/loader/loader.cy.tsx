//import Loader from '@/app/components/loader/loader.component';

import Loader from '@/app/components/loader/loader.component';
import { mount } from 'cypress/react';

describe('<Loader />', () => {
  it('should render', () => {
    mount(<Loader />);
  });
});
