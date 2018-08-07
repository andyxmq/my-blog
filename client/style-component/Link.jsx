import React from 'react'
import styled from 'styled-components'

const BasicLink = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
)

const StyledLink = styled(BasicLink)`
  color: palevioletred;
  font-weight: bold;
`;

class Link extends React.Component{
  render(){
    return [
      <BasicLink key='basicLink'>Unstyled, boring Link</BasicLink>,
      <StyledLink key='styleLink'>Styled, exciting Link</StyledLink>
    ]
  }
}

export default Link;