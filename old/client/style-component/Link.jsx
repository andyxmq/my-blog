import React from 'react';
import styled from 'styled-components';

const BasicLink = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);

const StyledLink = styled(BasicLink)`
  color: palevioletred;
  font-weight: bold;
`;

class Link extends React.Component {
  render() {
    return [
      <BasicLink key="basicLink">
        Unstyled, boring Link从asdasd
      </BasicLink>,
      <StyledLink key="styleLink">
        Styled, exciting Link asdas
      </StyledLink>,
    ];
  }
}

export default Link;
