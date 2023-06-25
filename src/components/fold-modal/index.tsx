import React, { Children, ReactChild } from 'react';

import {Modal} from './style';

interface Props {
  isShow: boolean;
  style?:any;
  children?:ReactChild;
}

const FoldModal: React.FC<Props> = ({isShow,style,children}) => {
  
  return (
    <Modal isShow={isShow} style={style}>
      {children}
    </Modal>
  )
};

export default FoldModal;
