import styled, {keyframes} from 'styled-components';

const SeparatorLine = styled.div`
    border: ${(props) => props.border}px solid #f3f3f3;
    border-top-color: ${props.theme.colors.border}',
  border-top-width: '1px',
  border-top-style: 'solid', 
`;

export default SeparatorLine;