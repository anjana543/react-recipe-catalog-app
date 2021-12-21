import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PriceInfo from './PriceInfo';

const summary = {
  selectedRecipes: [
    {
      id: '5f4d4a7e62fb0224951e7ec4',
      name: 'Chicken Sausage & Spinach Ravioli',
      slug: 'chicken-sausage-spinach-ravioli',
      headline: 'with Tomato & Lemon',
      image: './assets/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg',
      selected: 1,
      selectionLimit: 1,
      extraCharge: 0,
      yields: 2,
      recipePrice: 1798,
    },
    {
      id: '5f4d4acdab96be0cd6073022',
      name: 'Figgy Balsamic Pork',
      slug: 'figgy-balsamic-pork',
      headline: 'with Roasted Carrots & Thyme Potatoes',
      image: './assets/5f4d4acdab96be0cd6073022-8b47d1f3.jpg',
      selected: 1,
      selectionLimit: null,
      extraCharge: 0,
      yields: 2,
      recipePrice: 1798,
    },
  ],
  shippingPrice: 1298,
  totalPrice: 1987,
};

let getByTestId, queryByTestId;

beforeEach(() => {
  const component = render(<PriceInfo summary={summary} />);
  getByTestId = component.getByTestId;
  queryByTestId = component.queryByTestId;
});

describe('PriceInfo', () => {
  it('should render PriceInfo component without crashing', () => {
    expect(getByTestId('price-info')).toBeInTheDocument();
  });

  it('should render info icon button and toggle price summary tooltip on click', async () => {
    const iconButton = getByTestId('price-info-button');
    expect(iconButton).toBeInTheDocument();
    fireEvent.click(iconButton);
    expect(getByTestId('price-summary')).toBeInTheDocument();
    fireEvent.click(iconButton);
    expect(queryByTestId('price-summary')).toBeFalsy();
  });
});
