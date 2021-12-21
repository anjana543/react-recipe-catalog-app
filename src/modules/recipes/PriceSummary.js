import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from '../../components/Box';
import Flex from '../../components/Flex';
import Text from '../../components/Text';
import { parseRawPrice } from './price';

/**
 * @description Component for Creating Price Summary user interface.
 * @param {Object} summary Selected recipe list and its related details.
 * @returns {Node} HTML Template for Price Summary.
 */
const PriceSummary = ({ summary }) => {
  const { selectedRecipes, shippingPrice, totalPrice } = summary;
  return (
    <Box width={['290px', '450px']} padding="16px" data-testid="price-summary">
      {selectedRecipes?.map((recipe) => (
        <Flex
          backgroundColor="neutral_100"
          justifyContent="space-between"
          alignItems="center"
          padding="0"
          paddingBottom="xs"
          role="recipeitem"
          key={`price_${recipe.id}`}>
          <Text
            aria-label={`${recipe?.selected > 1 && recipe.selected} ${recipe.name} `}
            tabIndex="0"
            fontSize="md"
            lineHeight="27px">
            {recipe.name} {recipe?.selected > 1 && ` x ${recipe.selected}`}
          </Text>
          <Text tabIndex="0" fontSize="md" lineHeight="27px">
            {parseRawPrice(recipe.recipePrice)}
          </Text>
        </Flex>
      ))}
      <Flex
        backgroundColor="neutral_100"
        justifyContent="space-between"
        alignItems="center"
        padding="0"
        paddingBottom="xs"
        data-testid="shipping-price-block">
        <Text tabIndex="0" fontSize="md" lineHeight="27px">
          Shipping
        </Text>
        <Text tabIndex="0" fontSize="md" lineHeight="27px">
          {parseRawPrice(shippingPrice)}
        </Text>
      </Flex>
      <SeparatorLine />
      <Flex
        backgroundColor="neutral_100"
        justifyContent="space-between"
        alignItems="center"
        padding="0"
        paddingTop="xs"
        data-testid="total-price-block">
        <Text tabIndex="0" fontSize="md" lineHeight="27px" fontWeight="600">
          Total
        </Text>
        <Text tabIndex="0" fontSize="md" lineHeight="27px" fontWeight="600">
          {parseRawPrice(totalPrice)}
        </Text>
      </Flex>
    </Box>
  );
};

const SeparatorLine = styled.div`
  border-top-color: ${(props) => props?.theme?.colors?.border};
  border-top-width: 1px;
  border-top-style: solid;
`;

PriceSummary.propTypes = {
  summary: PropTypes.shape({
    selectedRecipes: PropTypes.array.isRequired,
    shippingPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

PriceSummary.defaultProps = {
  summary: {},
};

export default PriceSummary;
