import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';

import Flex from '../../components/Flex';
import Box from '../../components/Box';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IconMinusCircle from '../../icons/IconMinusCircle';
import IconPlusCircle from '../../icons/IconPlusCircle';
import { parseRawPrice } from './price';
import { checkSelectedRecipesExceedsTheGivenLimit } from '../../services/recipes/Filter';

/**
 * @description Component for displaying Recipe Details in a card view.
 * @returns {Node} HTML Template for a Recipe.
 */
const RecipeCard = ({
  extraCharge,
  handleAddRecipe,
  handleRemoveRecipe,
  headline,
  id,
  image,
  maxRecipesSelected,
  minRecipesSelected,
  name,
  selected,
  selectionLimit,
  yields,
}) => (
  <Box
    borderWidth={selected ? 'md' : null}
    borderStyle={selected ? 'solid' : null}
    borderColor={selected ? 'primary_600' : null}
    m={selected ? '-2px' : null}
    borderRadius="md"
    boxShadow="lg"
    data-testid="recipe-card">
    <Box borderRadius="2px 2px 0px 0px" paddingBottom="56.25%" overflow="hidden" height="0">
      <img src={process.env.PUBLIC_URL + image} alt={name} width="100%" />
    </Box>
    <Box p="xs" height="120px">
      <Text tabIndex="0" fontWeight="bold" fontFamily="primary" fontSize="md">
        {name}
      </Text>
      <Text tabIndex="0" fontWeight="regular" fontFamily="secondary" fontSize="sm">
        {headline}
      </Text>
    </Box>
    {selected ? (
      <SelectedRecipeFooter
        recipeId={id}
        yields={yields}
        selected={selected}
        selectionLimit={selectionLimit}
        maxRecipesSelected={maxRecipesSelected}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
      />
    ) : (
      <UnselectedRecipeFooter
        recipeId={id}
        price={extraCharge && extraCharge}
        selected={selected}
        minRecipesSelected={minRecipesSelected}
        maxRecipesSelected={maxRecipesSelected}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
      />
    )}
  </Box>
);

RecipeCard.propTypes = {
  extraCharge: PropTypes.number,
  handleAddRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
  headline: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  maxRecipesSelected: PropTypes.bool,
  minRecipesSelected: PropTypes.bool,
  name: PropTypes.string,
  selected: PropTypes.number,
  selectionLimit: PropTypes.number,
  yields: PropTypes.number,
};

const UnselectedRecipeFooter = ({
  price,
  recipeId,
  minRecipesSelected,
  maxRecipesSelected,
  handleAddRecipe,
}) => (
  <Flex p="xs" data-testid="unselected-footer">
    <Box flex="50%" alignSelf="center">
      {price ? (
        <Text
          tabIndex="0"
          aria-label={`Extra charge + ${parseRawPrice(price)}`}
          color="primary_600">
          +{parseRawPrice(price)}
        </Text>
      ) : null}
    </Box>
    <Box flex="50%">
      <Button
        onClick={() => handleAddRecipe(recipeId)}
        variant="secondary"
        width="100%"
        p="0"
        disabled={maxRecipesSelected}
        tabIndex="0"
        data-testid="add-quanitity"
        aria-label={minRecipesSelected ? 'Add' : 'Add extra meal'}>
        {minRecipesSelected ? 'Add' : 'Add extra meal'}
      </Button>
    </Box>
  </Flex>
);

UnselectedRecipeFooter.propTypes = {
  price: PropTypes.number,
  recipeId: PropTypes.string,
  minRecipesSelected: PropTypes.bool,
  maxRecipesSelected: PropTypes.bool,
  handleAddRecipe: PropTypes.func,
};

const SelectedRecipeFooter = ({
  recipeId,
  selected,
  selectionLimit,
  yields,
  maxRecipesSelected,
  handleAddRecipe,
  handleRemoveRecipe,
}) => {
  const isMaxRecipeSelected = checkSelectedRecipesExceedsTheGivenLimit(selectionLimit, selected);
  return (
    <Flex
      backgroundColor="primary_600"
      justifyContent="space-between"
      alignItems="center"
      data-testid="selected-footer">
      <SelectionButton onClick={() => handleRemoveRecipe(recipeId)} title="Decrease Quantity">
        <IconMinusCircle />
      </SelectionButton>
      <Box
        color="white"
        tabIndex="0"
        aria-label={`${selected} in your box (${selected * yields} servings)`}>
        <Text
          textAlign="center"
          fontWeight="bold"
          fontFamily="secondary"
          fontSize="md"
          data-testid="counter-container">
          {selected} in your box
        </Text>
        <Text textAlign="center" fontFamily="secondary" fontSize="sm">
          ({selected * yields} servings)
        </Text>
      </Box>
      <SelectionButton
        onClick={() => handleAddRecipe(recipeId)}
        title="Increase Quantity"
        disabled={maxRecipesSelected || isMaxRecipeSelected}>
        <IconPlusCircle />
      </SelectionButton>
    </Flex>
  );
};

SelectedRecipeFooter.propTypes = {
  recipeId: PropTypes.string,
  selected: PropTypes.number,
  selectionLimit: PropTypes.number,
  yields: PropTypes.number,
  maxRecipesSelected: PropTypes.bool,
  handleAddRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
};

const SelectionButton = styled.button`
  ${css({
    outline: 'none',
    color: 'white',
    padding: 'sm',
    cursor: 'pointer',
    backgroundColor: 'primary_600',
    border: 'none',
    ':hover:enabled': {
      backgroundColor: 'primary_700',
    },
    ':active:enabled': {
      backgroundColor: 'primary_800',
    },
  })}
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export default RecipeCard;
