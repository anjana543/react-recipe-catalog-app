import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import RecipesList from './RecipesList';
import FreshToHome from '../../data/FreshToHome';
import { parseRawPrice } from './price';

const recipeList = FreshToHome;
const totalPrice = 6692;
//fake timers
beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

let getByTestId, queryByTestId, getAllByRole;

beforeEach(() => {
  const component = render(<RecipesList />);
  getByTestId = component.getByTestId;
  queryByTestId = component.queryByTestId;
  getAllByRole = component.getAllByRole;
});

describe('RecipesList', () => {
  it('should render RecipesList component without crashing', () => {
    expect(getByTestId('recipes-list')).toBeInTheDocument();
  });

  describe('when the fetch operation is triggered', () => {
    it('shows a loading div', () => {
      expect(getByTestId('recipe-loading')).toBeInTheDocument();
      cleanup();
    });
    it('shows a list of recipes and total price of selected recipes', async () => {
      act(() => jest.advanceTimersByTime(1000));
      expect(getByTestId('headline')).toHaveTextContent(recipeList?.headline);
      const price = parseRawPrice(totalPrice);
      expect(getByTestId('price-total')).toHaveTextContent(price);
      expect(getByTestId('price-info')).toBeInTheDocument();
      const recipes = getAllByRole('recipeitem');
      expect(recipes).toHaveLength(recipeList?.recipes?.length);
      expect(queryByTestId('recipe-loading')).toBeFalsy();
    });
  });
});
