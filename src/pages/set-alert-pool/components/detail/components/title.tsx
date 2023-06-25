import React, { useState } from 'react';
import styled from 'styled-components';
import MessageConfirm from '@/components/message-confirm';
import { getHocComp } from '@/utils';

 const TitleConteiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 30px;
  cursor: default;
`;

const RemoveDiv = styled.div`
  margin-right: 10px;
  color: red;
  font-weight: normal;
`

const Title:React.FC = (props:any) => {
  const {asyncDeleteData,poolName} = props;
  const [isVisible, setIsvisible] = useState(false)

  const deleteData = () => {
    setIsvisible(true)
  }

  const handleOk = async () => {
    asyncDeleteData && (await asyncDeleteData())
    setIsvisible(false)
  }

  return (
    <>
      <MessageConfirm 
        title='删除'
        isVisible={isVisible}
        handleOK={handleOk}
        handleCancel={() => setIsvisible(false)}
      />
      <TitleConteiner>
        <span>{poolName} 信息如下</span>
        <RemoveDiv onClick={deleteData}>移除</RemoveDiv>
      </TitleConteiner>
    </>
  )
};

export default getHocComp(Title);