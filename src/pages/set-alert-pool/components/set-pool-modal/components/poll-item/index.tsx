import React, { useState, useRef } from 'react';
import {
  ToTopOutlined,
  FileSearchOutlined,
  StarOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Tooltip, Input } from 'antd';
import { Link } from '@lugia/lugiax-router';

import './index.css';
import styled from 'styled-components';

interface Props {
  itemObj: any;
  handleChangeModal: (params: any) => void;
  handleChangeAnalysisModal: (params: any) => void;
  handleCollection: (params: any) => void;
  handleClickDelete: (params: any) => void;
  handleClickSearch: (id: string) => void;
  handleEditModal: (params: any) => void;
  handleLookModal: (params: any) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 34px;
  font-size: 12px;

  .ant-input {
    font-size: 12px;
  }
`;

const IconBox = styled.span`
  margin-right: 5px;
`;

const PollItem: React.FC<Props> = ({
  itemObj,
  handleChangeModal,
  handleChangeAnalysisModal,
  handleCollection,
  handleClickDelete,
  handleClickSearch,
  handleEditModal,
  handleLookModal,
}) => {
  const iconMenu = [
    {
      name: '查看',
      key: 'look',
      render: (
        <EyeOutlined style={{ cursor: 'default' }} onClick={() => handleLookModal(itemObj)} />
      ),
    },
    {
      name: '编辑',
      key: 'edit',
      render: (
        <EditOutlined style={{ cursor: 'default' }} onClick={() => handleEditModal(itemObj)} />
      ),
    },
    {
      name: '上传',
      key: 'upload',
      render: (
        <ToTopOutlined
          style={{ cursor: 'default' }}
          onClick={() => handleChangeAnalysisModal(itemObj)}
        />
      ),
    },
    {
      name: '查询',
      key: 'search',
      render: (
        <FileSearchOutlined
          style={{ cursor: 'pointer' }}
          onClick={() => handleClickSearch(itemObj.alertPoolId)}
        />
      ),
      // render: <Link to={`/set-alert-pool/${itemObj.id}`}><FileSearchOutlined style={{cursor: 'pointer'}}/></Link>
    },
    {
      name: '收藏',
      key: 'collection',
      render: (
        <StarOutlined
          // style={{ color: isCollection ? 'red' : undefined, cursor: 'default'}}
          style={{ cursor: 'default' }}
          onClick={() => handleCollection(itemObj)}
        />
      ),
    },
    {
      name: '删除',
      key: 'delete',
      render: (
        <DeleteOutlined
          style={{ cursor: 'default', color: 'red' }}
          onClick={() => handleClickDelete(itemObj)}
        />
      ),
    },
  ];

  const [isShowInput, setIsShowInput] = useState(false);
  const [value, setValue] = useState(itemObj.alertPoolName);
  const inputRef = useRef(null);

  const handleClick = (itemObj: any, item: any) => {
    // console.log(11111, itemObj, item);
  };

  const dblclick = () => {
    // console.log('双击');
    setIsShowInput(true);

    setTimeout(() => {
      inputRef?.current!.focus({
        cursor: 'end',
      });
    }, 50);
  };

  const onBlur = e => {
    const values = e.target.value;
    setIsShowInput(false);
    if (!values) return;
    if (itemObj.alertPoolName === values) return;
    setValue(values);

    handleChangeModal({
      visible: true,
      name: values,
      status: 'update',
      originName: itemObj.alertPoolName,
      alertPoolId: itemObj.alertPoolId,
    });
  };

  return (
    <Container>
      {isShowInput ? (
        <Tooltip placement="top" title={itemObj.alertPoolName} overlayClassName="poll-item-tooltip">
          <Input
            ref={inputRef}
            size="small"
            style={{ width: '230px', height: '20px' }}
            defaultValue={itemObj.alertPoolName}
            onBlur={onBlur}
            maxLength={50}
          />
        </Tooltip>
      ) : (
        <div
          style={{
            cursor: 'default',
            // width: '280px',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          onDoubleClick={dblclick}
        >
          <Tooltip
            placement="top"
            title={itemObj.alertPoolName}
            overlayClassName="poll-item-tooltip"
          >
            {itemObj.alertPoolName}
          </Tooltip>
        </div>
      )}

      <div>
        {iconMenu.map((item, index) => (
          <Tooltip
            key={itemObj?.alertPoolId + '-' + index}
            placement="top"
            title={item.name}
            overlayClassName="poll-item-tooltip"
          >
            {/* <IconBox onClick={() => handleClick(itemObj, item)}>{item.render}</IconBox> */}
            <IconBox key={itemObj?.alertPoolId + '-' + index}>{item.render}</IconBox>
          </Tooltip>
        ))}
      </div>
    </Container>
  );
};

export default PollItem;
