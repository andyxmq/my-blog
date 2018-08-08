import React from 'react';
import styled from 'styled-components';

const StyleInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default () => (
  <div>
    <StyleInput placeholder="@aa" type="text" />
    <StyleInput placeholder="@geelen" type="text" />
  </div>
);
