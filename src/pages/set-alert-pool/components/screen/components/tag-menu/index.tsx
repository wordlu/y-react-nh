import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

interface Children {
  name: string;
  id: string;
}

interface SelectData {
  id:string;
  selectArr:string[];
}

interface Props {
  item: {
    name: string;
    id: string;
    children: Children[];
  };
  selectArr: string[];
  handleChangeSelect:(params:SelectData)=>void;
}

const TagBox = styled.div`
  margin-top: 5px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

// const Tag = styled.span<{ checked?: boolean }>`
//   padding: 0 5px 2px;
//   margin-top: 5px;
//   margin-right: 3px;
//   font-size: 14px;
//   display: inline-block;
//   cursor: pointer;
//   background: ${({ checked }) => (checked ? '#1890ff' : undefined)};
//   color: ${({ checked }) => (checked ? '#fff' : undefined)};
// `;

const TagContainer = styled.div`
  word-break: break-all;
`;

const TagMenu: React.FC<Props> = ({ item, selectArr,handleChangeSelect }) => {
  const onClick = ({ parentId, selectId }: { parentId: any; selectId: any }) => {
    // console.log(11111, parentId, selectId);
  };

  const handleChange = (tag:string,checked:boolean) => {

    const allId = item.children[0].id;
    // const nextSelectedTags = checked ? [...selectArr, tag]: selectArr.filter(t => t !== tag);
    let nextSelectedTags:string[] = [];
    if(checked){
      nextSelectedTags =  tag === allId? [tag]:[...selectArr,tag].filter(t=>t!==allId);
    }else{
      nextSelectedTags = selectArr.filter(t => t !== tag);
    }
    // console.log('You are interested in: ', nextSelectedTags);
    // setSelectedTags(nextSelectedTags);

    handleChangeSelect({id:item.id,selectArr:nextSelectedTags});
  }

  return (
    <TagBox>
      <Title>{item.name}</Title>
      <TagContainer>
        {item.children &&
          item.children.map(items => (
            // <Tag
            //   checked={selectArr.indexOf(items.id) > -1}
            //   onClick={() => onClick({ parentId: item.id, selectId: items.id })}
            // >
            //   {items.name}
            // </Tag>
            <Tag.CheckableTag
              style={{marginTop: '5px'}}
              key={items.id}
              checked={selectArr.indexOf(items.id) > -1}
              onChange={checked => handleChange(items.id, checked)}
            >
              {items.name}
            </Tag.CheckableTag>
          ))}
      </TagContainer>
    </TagBox>
  );
};

export default TagMenu;
