import React from 'react';
import { render, within } from '@testing-library/react';
import PriceSummary from './PriceSummary';
import { parseRawPrice } from './price';

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
      selected: 2,
      selectionLimit: null,
      extraCharge: 0,
      yields: 2,
      recipePrice: 3596,
    },
  ],
  shippingPrice: 1298,
  totalPrice: 1987,
};

let getByTestId, getAllByRole, getByText;

beforeEach(() => {
  const component = render(<PriceSummary summary={summary} />);
  getByTestId = component.getByTestId;
  getAllByRole = component.getAllByRole;
  getByText = component.getByText;
});

describe('PriceSummary', () => {
  it('should render PriceSummary component without crashing', () => {
    expect(getByTestId('price-summary')).toBeInTheDocument();
  });

  it('should render recipe list, shipping block and total price elements', () => {
    const recipes = getAllByRole('recipeitem');
    const selectedRecipeLength = summary?.selectedRecipes?.length;
    expect(recipes).toHaveLength(selectedRecipeLength);
    expect(getByTestId('shipping-price-block')).toBeInTheDocument();
    expect(getByTestId('total-price-block')).toBeInTheDocument();
  });

  it('should render recipe name and price of the recipe correctly', () => {
    const recipes = getAllByRole('recipeitem');
    const name = summary.selectedRecipes[0].name,
      price = parseRawPrice(summary.selectedRecipes[0].recipePrice);
    const recipeName = within(recipes[0]).getByText(name);
    expect(recipeName).toBeInTheDocument();
    const recipePrice = within(recipes[0]).getByText(price);
    expect(recipePrice).toBeInTheDocument();
  });

  it('should render recipe name twice correctly', () => {
    const recipes = getAllByRole('recipeitem');
    const selectedRecipes = summary.selectedRecipes[1].selected;
    const name = `${summary.selectedRecipes[1].name} ${
        selectedRecipes > 1 && 'x ' + selectedRecipes
      }`,
      price = parseRawPrice(summary.selectedRecipes[1].recipePrice);
    const recipeName = within(recipes[1]).getByText(name);
    expect(recipeName).toBeInTheDocument();
    const recipePrice = within(recipes[1]).getByText(price);
    expect(recipePrice).toBeInTheDocument();
  });
});
