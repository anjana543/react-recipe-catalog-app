import {
  checkSelectedRecipesExceedsTheGivenLimit,
  checkMaxRecipesSelected,
  checkMinRecipesSelected,
  filterRecipeListBasedOnSelection,
  calculateRecipePrice,
} from './Filter';

//mock data

const recipeList = {
  id: '5f4e821d531e677602591a9b',
  productName: 'Classic Box',
  headline: 'WEEK OF OCTOBER 12TH',
  min: 3,
  max: 8,
  baseRecipePrice: 1798,
  shippingPrice: 1298,
  recipes: [
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
    },
    {
      id: '5f4d4aa9f4508b34e9680613',
      name: 'Gouda Vibes Burgers',
      slug: 'gouda-vibes-burgers',
      headline: 'with Tomato Onion Jam & Potato Wedges',
      image: './assets/gouda-vibes-burgers-e3f56d7e.jpg',
      selected: 1,
      selectionLimit: null,
      extraCharge: 0,
      yields: 2,
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
    },
  ],
};

const expectedFilteredRecipeList = {
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
      id: '5f4d4aa9f4508b34e9680613',
      name: 'Gouda Vibes Burgers',
      slug: 'gouda-vibes-burgers',
      headline: 'with Tomato Onion Jam & Potato Wedges',
      image: './assets/gouda-vibes-burgers-e3f56d7e.jpg',
      selected: 1,
      selectionLimit: null,
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
  totalCount: 3,
  totalPrice: 5394,
};

const summaryList = filterRecipeListBasedOnSelection(
  recipeList?.recipes,
  recipeList?.baseRecipePrice
);

describe('Filter Recipes', () => {
  describe('properly filter recipe array based on selection', () => {
    it('check the filtered array length', () => {
      expect(summaryList?.selectedRecipes).toHaveLength(
        expectedFilteredRecipeList?.selectedRecipes?.length
      );
    });
    it('check filtered array properties', () => {
      expect(summaryList?.selectedRecipes?.[0]).toHaveProperty('recipePrice');
      expect(summaryList).toHaveProperty('totalCount');
      expect(summaryList).toHaveProperty('totalPrice');
    });
  });

  describe('check the recipe calculate is correct', () => {
    summaryList?.selectedRecipes?.forEach((item, index) => {
      it(`works correctly for ${item}`, () => {
        const recipePrice = calculateRecipePrice(
          item?.selected,
          recipeList?.baseRecipePrice,
          item?.extraCharge
        );
        const output = expectedFilteredRecipeList?.selectedRecipes[index]?.recipePrice;
        expect(recipePrice).toBe(output);
      });
    });
  });

  describe('Check min/max boundaries of selected recipes', () => {
    describe('check selected recipes max limit', () => {
      it('should return false if the selected recipes are below the box max limit', () => {
        const result = checkMaxRecipesSelected(6, 8);
        expect(result).toBeFalsy();
      });
      it('should return true if the selected recipes are equal to limit', () => {
        const result = checkMaxRecipesSelected(3, 3);
        expect(result).toBeTruthy();
      });
      it('should return true if the selected recipes are greater than limit', () => {
        const result = checkMaxRecipesSelected(6, 2);
        expect(result).toBeTruthy();
      });
    });
    describe('check selected recipes min limit', () => {
      it('should return false if the selected recipes are below the box min limit', () => {
        const result = checkMinRecipesSelected(3, 5);
        expect(result).toBeTruthy();
      });
      it('should return true if the selected recipes are greater than limit', () => {
        const result = checkMinRecipesSelected(6, 2);
        expect(result).toBeFalsy();
      });
    });
  });

  describe('check whether the selected recipes exceeds the limit', () => {
    it('should return false if the no of selected recipe is below the limit', () => {
      const result = checkSelectedRecipesExceedsTheGivenLimit(3, 1);
      expect(result).toBeFalsy();
    });
    it('should return false if the limit is null (no limit)', () => {
      const result = checkSelectedRecipesExceedsTheGivenLimit(null, 4);
      expect(result).toBeFalsy();
    });
    it('should return true if if the no of selected recipe is above the limit', () => {
      const result = checkSelectedRecipesExceedsTheGivenLimit(3, 4);
      expect(result).toBeTruthy();
    });
  });
});
