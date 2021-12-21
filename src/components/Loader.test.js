import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('the loader works', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
