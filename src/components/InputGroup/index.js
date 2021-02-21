import React from 'react';
import { StyledInputGroup } from './style';

const InputGroup = ({ children, ...props }) => {
  return <StyledInputGroup {...props}>{children}</StyledInputGroup>;
};

export default InputGroup;
