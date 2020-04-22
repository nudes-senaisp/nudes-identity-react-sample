import React from 'react';
import { shallow } from 'enzyme';

import { Provider } from 'react-redux';

import Root from '../Root';

let wrapped;

describe('<Root />', () => {
  beforeEach(() => {
    wrapped = shallow(<Root />);
  });

  it('renders the redux provider', () => {
    expect(wrapped.find(Provider).length).toEqual(1);
  });
});
