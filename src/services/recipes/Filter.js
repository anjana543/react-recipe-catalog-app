/**
 * @description Function to filter recipe list based on selection.
 * @param {Array} recipes Recipe list.
 * @param {number} baseRecipePrice - Base recipe price.
 * @returns {Object} Filtered recipe list with selected price and quantity.
 */
export const filterRecipeListBasedOnSelection = (recipes, baseRecipePrice) => {
  let totalPrice = 0,
    totalCount = 0;
  const selectedRecipes = recipes
    .filter((recipe) => recipe?.selected)
    .map((recipe) => {
      const recipePrice = calculateRecipePrice(
        recipe?.selected,
        baseRecipePrice,
        recipe?.extraCharge
      );
      totalPrice += recipePrice || 0;
      totalCount += recipe?.selected || 0;
      return {
        ...recipe,
        recipePrice,
      };
    });
  return {
    selectedRecipes,
    totalCount,
    totalPrice,
  };
};

/**
 * @description Calculate the recipe price of the selected recipe.
 * @param {number} selected - Number of specific selected recipes.
 * @param {number} baseRecipePrice - Base recipe price.
 * @param {number} extraCharge - Extra charge of the recipe.
 * @returns {number} - recipe price.
 */
export const calculateRecipePrice = (selected, baseRecipePrice, extraCharge) =>
  (baseRecipePrice + extraCharge) * selected;

/**
 * @description Checks individual recipe selection exceeds the given limit.
 * @param {number|null} selectionLimit - Recipe selection limit.
 * @param {number} selected - Number of specific selected recipes.
 * @returns {boolean} - true/false value.
 */
export const checkSelectedRecipesExceedsTheGivenLimit = (selectionLimit, selected) =>
  selectionLimit && selected >= selectionLimit;

/**
 * @description - Check whether the selected Recipe count exceeds min limit for box.
 * @param {number} recipeCount - Total Recipes selected.
 * @param {number} maxLimit - Minimum limit of box.
 * @returns {boolean} - true/false value.
 */
export const checkMinRecipesSelected = (recipeCount, minLimit) => {
  return recipeCount < minLimit;
};

/**
 * @description - Check whether the selected Recipe count exceeds max limit for box.
 * @param {number} recipeCount - Total Recipes selected.
 * @param {number} maxLimit - Maximum limit of box.
 * @returns {boolean} - true/false value.
 */
export const checkMaxRecipesSelected = (recipeCount, maxLimit) => {
  return recipeCount >= maxLimit;
};

/**
 * @description - Find the total count of the selected recipes.
 * @param {Array} recipes - Updated recipe list.
 * @returns {number} - Selected recipes.
 */
export const getSelectedRecipeTotalCount = (recipes) =>
  recipes.reduce((recipe1, recipe2) => ({ selected: recipe1.selected + recipe2.selected }))
    ?.selected;
