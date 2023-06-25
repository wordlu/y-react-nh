import React, { useState } from 'react';
import styled from 'styled-components';

interface Props{
  isFold: boolean;
  handleFoldChange:()=>void;
}

const Box = styled.div`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 60px;
  background: #1890ff;
  display: flex;
  align-items: center;
  color: #fff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-weight: 500;
  font-size: 10px;
  opacity: .7;
  cursor: default;
`

const Fold:React.FC<Props> = ({isFold,handleFoldChange}) => {

  return (
    <Box onClick={handleFoldChange}>
      {isFold?'>':'<'}
    </Box>
  )
};

export default Fold;