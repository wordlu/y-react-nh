import React, { useState, useEffect, useRef, useCallback } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Form, Select, Button, message, Tree, Empty, Modal, Tooltip } from 'antd';
import { Loading } from '@lugia/lugia-web';
import {
  SearchOutlined,
  FolderOpenOutlined,
  FileOutlined,
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import EditComboTree from '../editComboTree';
import AddComboTree from '../addComboTree';
import { getHocComp } from '@/utils';
import models from '../../models';

import { userAuthService } from '@/config/di.config';
import './style.css';

import {
  Container,
  LeftContainer,
  SelectContainer,
  TreeContainer,
  EmptyContainer,
} from '@/pages/liquidity-exposure/style';

import { ButtonContainer } from './style';

import '@/pages/liquidity-exposure/index.css';

const btnIdObj = {
  treeAdd: 'tree_add', // 树新增功能按钮
  treeUpdate: 'tree_update', // 树修改功能按钮
  treeDelete: 'tree_delete', // 树删除功能按钮
};

const comboTreeTableModal: React.FC = ({
  isShowModal,
  currentRow,
  permissions,
  updateIsShowModalInTime,
  updateCurrentRowInTime,
  asyncRemoveCompositeTree,
  asyncHandleSearch,
  asyncGetCompositeTreeDefine,
  currentTreeSql,
}) => {
  const [form] = Form.useForm();
  const cRef = useRef(null);
  const cRef1 = useRef(null);

  const [option, setOption] = useState<any[] | null>(null);
  const [selectValues, setSelectValues] = useState<null | string>(null);
  const [selectNames, setSelectNames] = useState<null | string>(null);

  const [treeData, setTreeData] = useState<any[] | undefined>(undefined);

  const [checkedValues, setCheckedValues] = useState<any[]>([]);
  const [refreshNode, setRefreshNode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  // const [tableLoading, setTableLoading] = useState<boolean>(false);

  const [height, setHeight] = useState<number>(0);
  const [tableHeight, setTableHeight] = useState<number>(0);

  // tree-复选值
  const [checkedData, setCheckedData] = useState<any>([]);

  // ctrl键盘
  const [isCtrl, setIsCtrl] = useState<boolean>(false);

  //组合树新增弹框
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [delModalOpen, setDelModalOpen] = useState<boolean>(false);

  useEffect(() => {
    (async function() {
      try {
        if (!isShowModal) return;
        if (!currentRow.userId) return;
        const { code, msg, data } = await userAuthService.getAllCompositeTree();
        if (code === 200) {
          setOption(data);
          if (data?.length) {
            setSelectValues(data[0].value); //下拉框默认值
            setSelectNames(data[0].label);
            await handleSelectSearch(data[0].value); //获取tree
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
  }, [currentRow.userId, refreshNode]);

  // 组合树类型查询
  const handleSelectSearch = async (value?: any) => {
    setLoading(true);
    setCheckedValues([]);
    setCheckedData([]);
    setTreeData([]);
    let val = ""
    if (value && typeof(value) === "string" && value !== "") {
      val = value
    }
    try {
      const { code, msg, data } = await userAuthService.getCompositeTreeByTreeIdHasAudit({
        treeId: val !== "" ? val : selectValues,
        userId: currentRow.userId,
      });
      const dataArr = [data];
      const treeArr = [];
      const treeArrData = [];
      if (code === 200) {
        if (data) {
          // 处理tree数据
          const fn = array => {
            if (!array || !array.length) return;
            array.forEach(item => {
              item.icon = item.isPF ? <FileOutlined /> : <FolderOpenOutlined />;
              item.title = item.nodeName;
              item.key = item.nodeCode;
              item.children = item.child;
              item.isLeaf = '';
              if (item.auth === '1') {
                treeArr.push(item.key);
                treeArrData.push(item);
              }
              if (item.children && item.children.length) {
                fn(item.children);
              }
            });
          };
          await fn(dataArr);
          setTreeData(dataArr);
          setCheckedValues(treeArr);
          setCheckedData(treeArrData);
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
    setAddModalOpen(true);
  };

  const handleSelectEdit = async() => {
    asyncGetCompositeTreeDefine && (await asyncGetCompositeTreeDefine({treeId: selectValues}))
    setEditModalOpen(true);
    cRef1.current && cRef1.current.initForms();
  };

  // 删除组合树
  const handleSelectDel = () => {
    setDelModalOpen(true);
  };

  // 确认删除组合树
  const handleDelOk = async () => {
    const params = {
      treeId: selectValues,
    };
    asyncRemoveCompositeTree && (await asyncRemoveCompositeTree(params));
    setSelectValues('');
    setTreeData([]);
    await setRefreshNode(!refreshNode);
    setDelModalOpen(false);
    // await updateCurrentRowInTime({});
  };
  //tree
  const onCheck = (checkedKeys, e) => {
    setCheckedData(e.checkedNodes);
    setCheckedValues(checkedKeys?.checked ? checkedKeys.checked : checkedKeys);
  };

  // 组合树类型选择
  const handleSelect = v => {
    setSelectValues(v);
    const sel = option.filter(it => it.value === v)[0];
    if (sel) {
      setSelectNames(sel.label);
    }
  };

  // 取消
  const clickCancel = () => {
    updateIsShowModalInTime(false);
  };

  // 还原
  const clickReset = () => {
    handleSelectSearch(selectValues);
  };

  // 添加组合树回调
  const dealAddClick = async () => {
    await updateIsShowModalInTime(false);
    await updateCurrentRowInTime({});
    setAddModalOpen(false);
    cRef.current && cRef.current.clearTree();
  };

  // 编辑组合树回调
  const dealEditClick = async () => {
    await updateIsShowModalInTime(false);
    await updateCurrentRowInTime({});
    setEditModalOpen(false);
    cRef1.current && cRef1.current.clearTree();
  };

  const clicksubmitTree = async () => {
    const nodesArr = checkedData.map(it => {
      return {
        nodeCode: it.nodeCode,
        nodeName: it.nodeName,
      };
    });
    const { code, msg, data } = await userAuthService.userAuth({
      treeId: selectValues,
      userId: currentRow.userId,
      nodes: nodesArr,
    });
    if (code === 200) {
      message.success('提交成功');
      updateIsShowModalInTime(false);
      asyncHandleSearch && (await asyncHandleSearch());
    } else {
      message.error(msg);
    }
  };

  const addTreeModel = async () => {
    cRef.current && cRef.current.clearTree();
    setAddModalOpen(false);
  };

  const [isShowbtnObj, setIsShowBtnObj] = useState({
    isShowAddBtn: false,
    isSHowUpdateBtn: false,
    isShowDeleteBtn: false,
  });

  // 控制功能按钮显隐权限
  useEffect(() => {
    const isShowBtn = key => {
      const btnArr = permissions?.visible?.filter(item => item === key) || [];
      return !!btnArr.length;
    };
    setIsShowBtnObj({
      isShowAddBtn: isShowBtn(btnIdObj.treeAdd),
      isSHowUpdateBtn: isShowBtn(btnIdObj.treeUpdate),
      isShowDeleteBtn: isShowBtn(btnIdObj.treeDelete),
    });
  }, [permissions]);

  const editModalCancel = () => {
    cRef1.current && cRef1.current.clearTree();
    setEditModalOpen(false)
  }

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <Modal
          title="组合树修改"
          visible={editModalOpen}
          onCancel={editModalCancel}
          bodyStyle={{ padding: '10px 24px' }}
          width="80%"
          footer={null}
        >
          <EditComboTree
            ref={cRef1}
            dealEditClick={dealEditClick}
            treeId={selectValues}
            treeName={selectNames}
            currentTreeSql={currentTreeSql}
          />
        </Modal>

        <Modal
          title="组合树新增"
          visible={addModalOpen}
          onCancel={addTreeModel}
          bodyStyle={{ padding: '10px 24px' }}
          width="80%"
          footer={null}
        >
          <AddComboTree ref={cRef} dealAddClick={dealAddClick} />
        </Modal>

        <Modal
          title="组合树删除"
          visible={delModalOpen}
          onCancel={() => setDelModalOpen(false)}
          bodyStyle={{ padding: '10px 24px' }}
          width="50%"
          footer={[
            <Button key="back" onClick={() => setDelModalOpen(false)}>
              取消
            </Button>,
            <Button key="submit" danger onClick={handleDelOk}>
              删除
            </Button>,
          ]}
        >
          <p>删除此项组合树，所有用户对该项组合树不可见且无法操作，请谨慎执行</p>
        </Modal>

        <LeftContainer>
          <ButtonContainer>
            <div className="combo-tree-sel-area">
              <span>组合树：</span>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={option}
                className="combo-tree-sel"
                placeholder="组合树类型"
                size="small"
                value={selectValues}
                onChange={handleSelect}
              >
                {/* {option?.map(item => (
                  <Select.Option key={item.value} children={item.label} value={item.value} />
                ))} */}
              </Select>

              <Button
                disabled={!selectValues}
                size="small"
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSelectSearch}
              ></Button>
            </div>

            <div>
              {isShowbtnObj.isShowAddBtn && (
                <Tooltip placement="top" title={'新增'} overlayClassName="poll-item-tooltip">
                  <Button
                    // disabled={!selectValues}
                    size="small"
                    icon={<PlusSquareOutlined />}
                    onClick={handleSelectAdd}
                  ></Button>
                </Tooltip>
              )}
              {isShowbtnObj.isSHowUpdateBtn && (
                <Tooltip placement="top" title={'修改'} overlayClassName="poll-item-tooltip">
                  <Button
                    disabled={!selectValues}
                    size="small"
                    icon={<EditOutlined />}
                    onClick={handleSelectEdit}
                  ></Button>
                </Tooltip>
              )}
              {isShowbtnObj.isShowDeleteBtn && (
                <Tooltip placement="top" title={'删除'} overlayClassName="poll-item-tooltip">
                  <Button
                    disabled={!selectValues}
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleSelectDel}
                  ></Button>
                </Tooltip>
              )}
            </div>
          </ButtonContainer>

          <TreeContainer id="tree" className="user-auth-tree">
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

          <ButtonContainer className="btn-area">
            <Button className="submit" type="primary" onClick={clicksubmitTree}>
              提交
            </Button>
            <Button className="restore" type="primary" onClick={clickReset}>
              还原
            </Button>
            <Button className="cancel" onClick={clickCancel}>
              取消
            </Button>
          </ButtonContainer>
        </LeftContainer>
      </Container>
    </ConfigProvider>
  );
};

export default getHocComp(comboTreeTableModal);
