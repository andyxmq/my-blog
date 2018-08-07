import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyleRotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

class Rotate extends React.Component{
  render(){
    return <StyleRotate>&lt; 💅 &gt;</StyleRotate>
  }
}

export default Rotate;