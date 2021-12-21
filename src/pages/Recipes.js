import React from 'react';
import RecipesList from '../modules/recipes/RecipesList';
import { Container } from '../components/Grid';
import Box from '../components/Box';

const Recipes = () => {
  return (
    <Container>
      <Box textAlign="center">
        <h1 tabIndex="0">Select Your Recipes</h1>
        <p tabIndex="0">
          Choose from an ever-changing mix of meat, fish, Beyond Meat™ and health-conscious
          offerings.
        </p>
      </Box>

      <RecipesList />
    </Container>
  );
};

export default Recipes;
