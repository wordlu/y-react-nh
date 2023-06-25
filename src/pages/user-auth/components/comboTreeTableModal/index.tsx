import React, { useState, useEffect, useRef, useCallback } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import {
  ConfigProvider,
  Form,
  Select,
  Button,
  message,
  Tree,
  Empty,
  Modal
} from 'antd';
import { Loading } from '@lugia/lugia-web';
import { SearchOutlined, FolderOpenOutlined, FileOutlined, PlusSquareOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditComboTree from '../editComboTree'

import { financingRepurchaseService } from '@/config/di.config';
import './style.css'

import {
  Container,
  LeftContainer,
  SelectContainer,
  TreeContainer,
  EmptyContainer,
} from '@/pages/liquidity-exposure/style';

import { ButtonContainer } from './style';

import '@/pages/liquidity-exposure/index.css';

const comboTreeTableModal: React.FC = ({
  makeTreeData,
}) => {
  const [form] = Form.useForm();

  const [option, setOption] = useState<any[] | null>(null);
  const [selectValues, setSelectValues] = useState<null | string>(null);

  const [treeData, setTreeData] = useState<any[] | undefined>(undefined);

  const [checkedValues, setCheckedValues] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [tableLoading, setTableLoading] = useState<boolean>(false);

  const [height, setHeight] = useState<number>(0);
  const [tableHeight, setTableHeight] = useState<number>(0);

  // tree-复选值
  const [checkedData, setCheckedData] = useState<any>(null);

  // ctrl键盘
  const [isCtrl, setIsCtrl] = useState<boolean>(false);

  //组合树新增弹框
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false)

  useEffect(() => {
    (async function() {
      try {
        const { code, msg, data } = await financingRepurchaseService.getPFTreeDownList();
        if (code === 200) {
          setOption(data);
          if (data?.length) {
            setSelectValues(data[0].key);

            const treeKeyData = JSON.parse(localStorage.getItem('stressTesting') || '{}');
            handleSelectSearch(treeKeyData);
          }
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    setHeight(document.getElementById('tree')?.offsetHeight || 0);

    const heights = document.getElementById('stress-testing-container')?.offsetHeight;
    setTableHeight(heights ? heights - 40 : 0);
  }, []);

  // 组合树类型查询
  const handleSelectSearch = async (value?: any) => {
    setLoading(true);
    setCheckedValues([]);
    setTreeData([]);
    try {
      const { code, msg, data } = await financingRepurchaseService.getPFTree({ key: selectValues });
      if (code === 200) {
        if (data) {
          const fn = array => {
            if (!array || !array.length) return;
            array.forEach(item => {
              item.icon = item.isPF ? <FileOutlined /> : <FolderOpenOutlined />;
              if (item.children && item.children.length) {
                fn(item.children);
              }
            });
          };
          await fn(data);
          setTreeData(data);
          value?.checkedValues && setCheckedValues(value.checkedValues);
          value?.checkedData && setCheckedData(value.checkedData);
        }
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAdd = () => {
    setAddModalOpen(true)
  }

  //tree
  const onCheck = (checkedKeys, e) => {
    setCheckedData(e.checkedNodes);
    setCheckedValues(checkedKeys?.checked ? checkedKeys.checked : checkedKeys);
  };

  // 组合树类型选择
  const handleSelect = v => {
    setSelectValues(v);
  };


  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <LeftContainer>
          <TreeContainer id="tree" className='modal-user-auth-tree'>
            <Loading loading={loading} isInherit={true}>
              {treeData?.length ? (
                <Tree
                  checkable
                  showIcon
                  checkStrictly={!isCtrl}
                  selectable={false}
                  defaultExpandAll
                  checkedKeys={checkedValues}
                  onCheck={onCheck}
                  autoExpandParent={true}
                  treeData={treeData}
                  className="tree"
                />
              ) : (
                <EmptyContainer>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </EmptyContainer>
              )}
            </Loading>
          </TreeContainer>
        </LeftContainer>
      </Container>
    </ConfigProvider>
  );
};

export default comboTreeTableModal;
