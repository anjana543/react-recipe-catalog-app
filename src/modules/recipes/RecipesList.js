import React, { useCallback, useEffect, useState } from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import Loader from '../../components/Loader';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import { parseRawPrice } from './price';
import useFetchFreshToHomeBox from '../../hooks/useFetchFreshToHomeBox';
import {
  filterRecipeListBasedOnSelection,
  checkMinRecipesSelected,
  checkMaxRecipesSelected,
} from '../../services/recipes/Filter';

/**
 * @description Recipe List Component.
 * @returns {Node} HTML Template for Recipe List.
 */
const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = useState([]);
  const { data, loading } = useFetchFreshToHomeBox();

  // min/max recipe boundaries
  const [minRecipesSelected, setMinRecipesSelected] = useState(false);
  const [maxRecipesSelected, setMaxRecipesSelected] = useState(false);

  // price summary and total price
  const [summary, setSummary] = useState({
    selectedRecipes: [],
    totalCount: 0,
    shippingPrice: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    const { recipes: fetchedRecipes } = data;
    if (fetchedRecipes) {
      setRecipes(fetchedRecipes);
    }
  }, [setRecipes, data]);

  /**
   * @description Function to add Recipe to the list.
   * @param {String} id Recipe ID.
   * @returns {void}
   */
  const handleAddRecipe = (id) => {
    const updatedReceipes = recipes?.map((recipe) =>
      recipe?.id === id ? { ...recipe, selected: recipe.selected + 1 } : recipe
    );
    setRecipes(updatedReceipes);
  };

  /**
   * @description Function to remove Recipe from the list.
   * @param {String} id Recipe ID.
   * @returns {void}
   */
  const handleRemoveRecipe = (id) => {
    const updatedReceipes = recipes?.map((recipe) =>
      recipe?.id === id ? { ...recipe, selected: recipe.selected - 1 } : recipe
    );
    setRecipes(updatedReceipes);
  };

  /**
   * @description - Callback to set summary and price of selected recipes
   */
  const setSummaryAndPrice = useCallback(() => {
    const filterRecipeList = filterRecipeListBasedOnSelection(recipes, data.baseRecipePrice);
    const isMinRecipesSelected = checkMinRecipesSelected(filterRecipeList?.totalCount, data.min);
    setMinRecipesSelected(isMinRecipesSelected);
    const isMaxRecipesSelected = checkMaxRecipesSelected(filterRecipeList?.totalCount, data.max);
    setMaxRecipesSelected(isMaxRecipesSelected);
    setSummary({
      selectedRecipes: filterRecipeList?.selectedRecipes || [],
      totalCount: filterRecipeList?.totalCount || 0,
      shippingPrice: data?.shippingPrice || 0,
      totalPrice: filterRecipeList?.totalPrice + data?.shippingPrice,
    });
  }, [recipes, data]);

  useEffect(() => {
    if (!recipes?.length) return;
    setSummaryAndPrice();
  }, [recipes, setSummaryAndPrice]);

  return (
    <div data-testid="recipes-list">
      {loading ? (
        <Loader width={100} height={100} data-testid="recipe-loading" />
      ) : (
        <>
          <Row>
            <Col sm={6}>
              <h3 tabIndex="0" aria-label={data?.headline} data-testid="headline">
                {data?.headline}
              </h3>
            </Col>
            {recipes?.length > 0 && (
              <Col sm={6}>
                <Flex alignItems="center" justifyContent="flex-end">
                  <Box textAlign="right" mr="xs">
                    <h3
                      tabIndex="0"
                      data-testid="price-total"
                      aria-label={parseRawPrice(
                        summary?.selectedRecipes?.length > 0 ? summary?.totalPrice : 0
                      )}>
                      {parseRawPrice(
                        summary?.selectedRecipes?.length > 0 ? summary?.totalPrice : 0
                      )}
                    </h3>
                  </Box>
                  <PriceInfo summary={summary} />
                </Flex>
              </Col>
            )}
          </Row>
          <Row>
            {recipes?.length > 0 ? (
              recipes.map((recipe) => (
                <Col sm={12} md={6} xl={4} key={recipe.id} role="recipeitem">
                  <Box mb="md" tabIndex="0">
                    <RecipeCard
                      {...recipe}
                      handleAddRecipe={handleAddRecipe}
                      handleRemoveRecipe={handleRemoveRecipe}
                      minRecipesSelected={minRecipesSelected}
                      maxRecipesSelected={maxRecipesSelected}
                    />
                  </Box>
                </Col>
              ))
            ) : (
              <Col sm={12}>
                <Flex alignItems="center" justifyContent="center">
                  No Recipes Found!
                </Flex>
              </Col>
            )}
          </Row>
        </>
      )}
    </div>
  );
};

export default Recipes;
