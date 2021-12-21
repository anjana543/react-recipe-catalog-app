import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '../../components/IconButton';
import IconInfoCircle from '../../icons/IconInfoCircle';
import Tooltip, { TooltipContainer } from '../../components/Tooltip';
import PriceSummary from './PriceSummary';
import useOnClickOutside from '../../hooks/useOnClickOutside';

/**
 * @description Component for showing the Price Info on icon click.
 * @param {Object} summary Selected recipe list and its shipping charges.
 * @returns {Node} HTML Template for Price Info.
 */
const PriceInfo = ({ summary }) => {
  const ref = React.useRef();
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  // Close on click outside of the tooltip
  useOnClickOutside(ref, () => setTooltipOpen(false));

  return (
    <TooltipContainer ref={ref} data-testid="price-info">
      <IconButton
        aria-label="Price details"
        onClick={() => setTooltipOpen(!isTooltipOpen)}
        disabled={summary?.selectedRecipeList?.length === 0}
        data-testid="price-info-button">
        <IconInfoCircle size="20" />
      </IconButton>
      {isTooltipOpen ? (
        <Tooltip>
          <PriceSummary summary={summary} />
        </Tooltip>
      ) : null}
    </TooltipContainer>
  );
};

PriceInfo.propTypes = {
  summary: PropTypes.shape({
    selectedRecipeList: PropTypes.array,
    shippingPrice: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
};

PriceInfo.defaultProps = {
  summary: {},
};

export default PriceInfo;
