import { Input, Tree, Select, Empty, message } from 'antd';
// import type { DataNode } from 'antd/es/tree';
import React, { useMemo, useState, useEffect } from 'react';
import { Loading } from '@lugia/lugia-web';
import { FolderOpenOutlined, FileOutlined } from '@ant-design/icons';

import { financingRepurchaseService, userAuthService } from '@/config/di.config';

import './style.css';

const { Search } = Input;

const { DirectoryTree } = Tree;

const SearchTree: React.FC = props => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [defaultData, setDefaultData] = useState<any[]>([]);
  const [option, setOption] = useState([]);
  const [selectValues, setSelectValues] = useState(null);
  const [treeLoading, setTreeLoading] = useState(false);

  // init
  useEffect(() => {
    (async () => {
      try {
        const { code, data, msg } =
          props.type === 'menu'
            ? await userAuthService.getAuthCompositeTree()
            : await financingRepurchaseService.qryAllTemplateTree();
        if (code === 200) {
          setOption(data || []);
          if (data?.length) {
            setSelectValues(data[0].value);
            getTreeData(data[0].value);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const getParentKey = (key: React.Key, tree): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey!;
  };

  const dataList: { key: React.Key; title: string }[] = [];
  const generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      dataList.push({ key, title: key as string });
      if (node.children) {
        generateList(node.children);
      }
    }
  };

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    generateList(defaultData);
    const newExpandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys as React.Key[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(() => {
    const loop = data =>
      data.map(item => {
        const strTitle = item.nodeName as string;
        const index = strTitle?.indexOf(searchValue);
        const beforeStr = strTitle?.substring(0, index);
        const afterStr = strTitle?.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (item.child) {
          return {
            title,
            key: item.id,
            businessId: props.type === 'menu' ? item.pfId : item.reportTemplateId,
            // isLeaf: props.type === 'menu' ? item.isPF : item.isLeaf === '1',
            isLeaf: item.isLeaf === '1',
            icon:
              props.type === 'menu' ? (
                item.isPF ? (
                  <FileOutlined />
                ) : (
                  <FolderOpenOutlined />
                )
              ) : item.reportTemplateId ? (
                <FileOutlined />
              ) : (
                <FolderOpenOutlined />
              ),
            nodeName: item.nodeName,
            children: loop(item.child),
          };
        }

        return {
          title,
          // isLeaf: props.type === 'menu' ? item.isPF : item.isLeaf === '1',
          isLeaf: item.isLeaf === '1',
          icon:
            props.type === 'menu' ? (
              item.isPF ? (
                <FileOutlined />
              ) : (
                <FolderOpenOutlined />
              )
            ) : item.reportTemplateId ? (
              <FileOutlined />
            ) : (
              <FolderOpenOutlined />
            ),
          businessId: props.type === 'menu' ? item.pfId : item.reportTemplateId,
          key: item.id,
          nodeName: item.nodeName,
        };
      });

    return loop(defaultData);
  }, [searchValue, defaultData]);

  const onSelect = (e: any, item: any) => {
    props.getSelectId && props.getSelectId(props.type, item.node.businessId, item.node.nodeName);
  };

  const handleSelect = (e: any, item: any) => {
    setSelectValues(e);
    getTreeData(e);
  };

  const getTreeData = async (key: any) => {
    setDefaultData([]);
    setTreeLoading(true);
    try {
      const { code, msg, data } =
        props.type === 'menu'
          ? await userAuthService.getCompositeTreeByUserAndTreeId({ treeId: key })
          : await financingRepurchaseService.qryTemplateTree({ treeId: key });

      if (code === 200) {
        const fn = array => {
          if (!array || !array.length) return;
          array.forEach(item => {
            if (item.child && item.child.length) {
              fn(item.child);
            }
          });
        };
        await fn(data ? [data] : []);

        setDefaultData(data ? [data] : []);
      } else {
        setDefaultData([]);
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTreeLoading(false);
    }
  };

  return (
    <div className="search-plan-top">
      <div className="search-plan-typeSelect">
        <Select
          placeholder={props.type === 'menu' ? '组合树类型' : '角色类型'}
          size="small"
          style={{ width: '100%' }}
          value={selectValues}
          // allowClear
          onChange={handleSelect}
        >
          {/* {option?.map(item => (
            <Select.Option key={item.key} children={item.title} value={item.key} />
          ))} */}
          {option?.map(item => (
            <Select.Option key={item.value} children={item.label} value={item.value} />
          ))}
        </Select>
      </div>
      {/* <Search style={{ marginBottom: 8 }} size='small' placeholder="查询" onChange={onChange} /> */}
      <div className="search-plan-tree">
        <Loading loading={treeLoading} isInherit={true}>
          {treeData?.length ? (
            <DirectoryTree
              showIcon
              onSelect={onSelect}
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              treeData={treeData}
              className="tree"
            />
          ) : (
            <div className="search-plan-empty">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </Loading>
      </div>
    </div>
  );
};

export default SearchTree;
