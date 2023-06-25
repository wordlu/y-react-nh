import React, { useEffect, useState } from 'react';
import { Select, Tree, Button, Empty, Input } from 'antd';
import { SearchOutlined, FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Loading } from '@lugia/lugia-web';

import { filterQueryData, checkUpData, arrayIsEmpty } from './common';

import {
  Container,
  SelectContainer,
  TreeContainer,
  EmptyContainer,
  SearchContainer,
} from './style';

interface Props {
  option?: any[]; // 组合树类型集合
  treeData?: any[]; // 树数据
  isMark?: boolean; // 是否拿上次选择结果
  fetchMarkTree?: (treeKey?: string | undefined) => Promise<any>; // 获取上次选择结果
  fetchTreeTypeOptions: () => Promise<any>; // 获取树类型
  fetchTree: (key: string) => Promise<any>; // 获取组合树
  onCheck: (checkedNodes: any) => void; // 点击复选框
}

const TreeComponent: React.FC<Props> = ({
  isMark,
  fetchMarkTree,
  fetchTreeTypeOptions,
  fetchTree,
  onCheck,
}) => {
  // 下拉框默认值
  const [selectValues, setSelectValues] = useState<string | undefined>(undefined);
  // 下拉框数据
  const [option, setOption] = useState<any[] | null>(null);

  // 树loading
  const [loading, setLoading] = useState<boolean>(false);
  // 树数据
  const [treeData, setTreeData] = useState<any[]>([]);
  // 复选树节点集合
  const [checkedTreeLeaf, setCheckedTreeLeaf] = useState<any>([]);
  // 复选树节点keys集合
  const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
  // 展开树keys集合
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  // 是否自动展开父节点
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  // 快速检索树数据
  const [retrievalTreeData, setRetrievalTreeData] = useState<any[]>([]);
  const [query, setQuery] = useState<string>('');

  // ctrl键盘
  const [isCtrl, setIsCtrl] = useState<boolean>(false);

  // init
  useEffect(() => {
    // isMark true->拿存储的类型和树数据 false->默认展开类型下拉第一条数据
    if (isMark && fetchMarkTree) {
      getMarkPfTree();
    } else {
      fetachTreeType();
    }
  }, []);

  // 获取上次查询选择
  const getMarkPfTree = (treeKey?: string) => {
    fetchMarkTree?.(treeKey).then(markObj => {
      // markObj.treeKey && setSelectValues(markObj.treeKey)
      markObj.checkedTreeLeaf?.length && setCheckedTreeLeaf(markObj.checkedTreeLeaf);
      markObj.checkedKeys?.length && setCheckedKeys(markObj.checkedKeys);
      // 初始化需请求
      !treeKey && fetachTreeType(markObj.treeKey);
    });
  };

  // 获取组合树类型
  const fetachTreeType = (treeKey?: string) => {
    fetchTreeTypeOptions().then(options => {
      setOption(options);
      if (options?.length) {
        const key = treeKey ? treeKey : options[0].key;
        setSelectValues(key);
      }
    });
  };

  // 获取组合树
  const fetchTreeData = (key: string) => {
    setLoading(true);
    setTreeData([]);
    fetchTree(key)
      .then(data => {
        setTreeData(data);
        setRetrievalTreeData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 组合树选择更新操作
  useEffect(() => {
    if (selectValues) {
      // setCheckedTreeLeaf([]);
      // setCheckedKeys([]);
      setRetrievalTreeData([]);
      setQuery('');

      fetchTreeData(selectValues);
      // isMark && getMarkPfTree(selectValues);
    }
  }, [selectValues]);

  // 选择组合树类型
  const handleSelect = (v: string) => {
    setSelectValues(v);
    setCheckedTreeLeaf([]);
    setCheckedKeys([]);
    isMark && getMarkPfTree(v);
  };

  const deepChecked = (treeLeaf: any[], treeKeys: any[], node: any, checked: boolean) => {
    // 上次选中-> 取消父节点选中，所有孩子取消选中
    // 所有孩子取消选中-> (找下孩子在keys和leaf是否存在，存在-> keys,leaf中删除)

    // 没选中-> 选中父节点、所有孩子
    // 所有孩子全部选中-> 孩子不在keys中push，存在的话不执行push
    const i = treeKeys.indexOf(node.key);
    if (checked) {
      i > -1 && treeKeys.splice(i, 1);
      i > -1 && treeLeaf.splice(i, 1);
    } else {
      i === -1 && treeKeys.push(node.key);
      i === -1 && treeLeaf.push(node);
    }

    if (!arrayIsEmpty(node?.children)) {
      node.children.forEach(item => {
        deepChecked(treeLeaf, treeKeys, item, checked);
      });
    }
  };

  // 点击树复选框
  const onCheckTree = (keys: any, e: any) => {
    let treeLeaf = checkedTreeLeaf;
    let treeKeys = checkedKeys;

    if (isCtrl) {
      deepChecked(treeLeaf, treeKeys, e.node, !!e.node.checked);
    } else {
      treeKeys = keys.checked;
      if (e.checked) {
        treeLeaf.push(e.node);
      } else {
        const i = checkedKeys.indexOf(e.node.key);
        i !== -1 && treeLeaf.splice(i, 1);
      }
    }

    setCheckedKeys([...treeKeys]);
    setCheckedTreeLeaf([...treeLeaf]);
    onCheck(treeLeaf);
  };

  // 展开/收起节点时触发
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  // 默认展开
  useEffect(() => {
    if (treeData?.length) {
      onExpandAll();
    }
  }, [treeData]);

  const deepTraversa = (node: any, nodeList: any[] = []) => {
    if (node !== null) {
      nodeList.push(node.key + '');
      let children = node.children;
      for (let i = 0; i < children.length; i++) {
        deepTraversa(children[i], nodeList);
      }
    }
    return nodeList;
  };

  // 展开全部
  const onExpandAll = () => {
    const expandedKeysArr: any[] = [];
    treeData?.forEach(item => {
      expandedKeysArr.push(deepTraversa(item));
    });

    setExpandedKeys(expandedKeysArr.flat());
  };

  // 收起全部
  const onExpandClose = () => {
    setExpandedKeys([]);
  };

  // 快速检索
  const onChange = async (e: any) => {
    const val = e.target.value;
    setQuery(val);
    if (!val) {
      setRetrievalTreeData(treeData);
      return;
    }
    const datas = filterQueryData(checkUpData(treeData), val);
    setRetrievalTreeData(datas);
  };

  // tree 键盘事件
  useEffect(() => {
    const onKeyDown = e => {
      if (e.keyCode === 17) {
        !isCtrl && setIsCtrl(true);
      }
    };

    const onKeyUp = e => {
      if (e.keyCode === 17) {
        setIsCtrl(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return function() {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <Container>
      <SelectContainer>
        <Select placeholder="组合树类型" size="small" value={selectValues} onChange={handleSelect}>
          {option?.map(item => (
            <Select.Option key={item.key} children={item.title} value={item.key} />
          ))}
        </Select>
        {/* <Button
          type="primary"
          disabled={!selectValues}
          size="small"
          icon={<SearchOutlined />}
        ></Button> */}
      </SelectContainer>
      <SearchContainer>
        <Input.Search
          style={{ marginRight: 5 }}
          size="small"
          placeholder="快速检索"
          value={query}
          onChange={onChange}
        />
        <Button size="small" onClick={onExpandClose}>
          <FolderOutlined />
        </Button>
        <Button size="small" onClick={onExpandAll}>
          <FolderOpenOutlined />
        </Button>
      </SearchContainer>
      <TreeContainer id="tree">
        <Loading loading={loading} isInherit={true}>
          {treeData?.length ? (
            <Tree.DirectoryTree
              checkable
              showIcon
              // checkStrictly={!isCtrl}
              checkStrictly={true}
              selectable={false}
              // defaultExpandAll
              checkedKeys={checkedKeys}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheckTree}
              onExpand={onExpand}
              treeData={retrievalTreeData}
              className="tree"
            />
          ) : (
            <EmptyContainer>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </EmptyContainer>
          )}
        </Loading>
      </TreeContainer>
    </Container>
  );
};

export default TreeComponent;
