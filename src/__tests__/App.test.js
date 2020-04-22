import React from 'react';
import { shallow } from 'enzyme';

import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import PrivateLayout from '@/layouts/PrivateLayout';
import HomePage from '@/pages/HomePage';

let wrapped;

describe('<App />', () => {
  beforeEach(() => {
    wrapped = shallow(<App />);
  });

  it('renders the application router', () => {
    expect(wrapped.find(BrowserRouter).length).toEqual(1);
  });

  it('renders the home route with correct props', () => {
    const component = wrapped.find(PrivateLayout);

    expect(component.length).toEqual(1);
    expect(component.prop('path')).toEqual('/');
    expect(component.prop('exact')).toEqual(true);
    expect(component.prop('component')).toEqual(HomePage);
  });
});
