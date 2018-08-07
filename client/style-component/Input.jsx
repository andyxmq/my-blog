import React from 'react'
import styled from 'styled-components'

const StyleInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
` 

class Input extends React.Component{
  render(){
    return <div>
      <StyleInput placeholder="@aa" type="text" />
      <StyleInput placeholder="@geelen" type="text" />
    </div>
  }
}
export default Input;