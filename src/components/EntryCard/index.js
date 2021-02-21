import React from 'react';
import { StyledEntryCard } from './style';

const EntryCard = ({ children, ...props }) => {
  return <StyledEntryCard {...props}>{children}</StyledEntryCard>;
};

export default EntryCard;
