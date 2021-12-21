import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RecipeCard from './RecipeCard';

const mockCallBack = jest.fn();

describe('RecipeCard', () => {
  it('should render RecipeCard component without crashing', () => {
    const { getByTestId } = render(<RecipeCard />);
    expect(getByTestId('recipe-card')).toBeInTheDocument();
  });

  describe('display recipe footer based on selection', () => {
    it('render unselected recipe footer when no selection is made', async () => {
      const { getByTestId, getByRole } = render(
        <RecipeCard selected={0} handleAddRecipe={mockCallBack} />
      );
      const footerEl = getByTestId('unselected-footer');
      expect(footerEl).toBeInTheDocument();
      fireEvent.click(getByTestId('add-quanitity'));
    });

    it('render selected recipe footer when selection is made', async () => {
      const { getByTestId } = render(<RecipeCard selected={1} handleAddRecipe={mockCallBack} />);
      const footerEl = getByTestId('selected-footer');
      expect(footerEl).toBeInTheDocument();
    });

    it('increment recipe count on button click', async () => {
      const props = {
        handleAddRecipe: jest.fn(),
        selected: 1,
        selectionLimit: 3,
      };
      const { getByTestId, getByRole } = render(<RecipeCard {...props} />);
      const incBtnEl = getByRole('button', { name: 'Increase Quantity' });
      const counterEl = getByTestId('counter-container');
      const expectedText = `${props.selected} in your box`;
      expect(counterEl).toHaveTextContent(expectedText);
      fireEvent.click(incBtnEl);
    });
  });
});
