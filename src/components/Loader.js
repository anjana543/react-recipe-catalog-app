import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: ${(props) => props?.border}px solid #f3f3f3;
  border-radius: 50%;
  border-top: ${(props) => props?.border}px solid
    ${(props) => (props?.color ? props.color : props?.theme?.colors?.primary_600)};
  width: ${(props) => props?.width}px;
  height: ${(props) => props?.height}px;
  animation: ${rotate360} 1000ms linear infinite;
  margin: 0px auto;
`;

Loader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  border: PropTypes.number,
  color: PropTypes.string,
};

Loader.defaultProps = {
  width: 100,
  height: 100,
  border: 5,
  color: '',
};

export default Loader;
