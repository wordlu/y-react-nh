import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Select, message, Tree, Button, Empty } from 'antd';
import { SearchOutlined, FolderOpenOutlined, FileOutlined } from '@ant-design/icons';

import TreeComponent from '@/components/tree/index1';
import { financingRepurchaseService, bizdictService } from '@/config/di.config';

interface Props {
  isMark?: boolean;
  onInitGetMark?: (isInit: boolean) => void;
}

const PFTree = forwardRef(({ isMark, onInitGetMark }: Props, ref) => {
  const [treeId, setTreeId] = useState<string | undefined>(undefined);
  const [checkedNodes, setCheckedNodes] = useState<any[]>([]);

  useImperativeHandle(ref, () => ({
    treeId,
    checkedNodes,
  }));

  const clearStatus = () => {
    setTreeId('');
    setCheckedNodes([]);
  };

  // 获取上次选择结果
  const getMarkPfTree = (key?: string) => {
    clearStatus();
    return new Promise(async function(resolve, reject) {
      let treeKey = '';
      let checkedTreeLeaf = [];
      let checkedKeys = [];
      try {
        const { code, msg, data } = await financingRepurchaseService.getMarkPfTree({
          treeId: key || undefined,
        });
        if (code === 200) {
          if (data?.treeKey) treeKey = data.treeKey;
          if (data?.checkedTreeLeaf) checkedTreeLeaf = data.checkedTreeLeaf;
          if (data?.checkedKeys) checkedKeys = data.checkedKeys;
          setCheckedNodes(data?.checkedTreeLeaf || checkedTreeLeaf);
          setTreeId(data?.treeKey || treeKey);
          // 页面初始化获取mark成功
          !key && onInitGetMark?.(true);
        }
        resolve({
          treeKey,
          checkedTreeLeaf,
          checkedKeys,
        });
      } catch (err) {
        console.log(err);
      }
    });
  };

  // 获取树类型
  const fetchTreeTypeOptions = () => {
    return new Promise(async function(resolve, reject) {
      try {
        const { code, msg, data } = await financingRepurchaseService.getPFTreeDownList();
        if (code === 200) {
          resolve(data || []);
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  // 获取组合树
  const fetchTree = (key: string) => {
    setTreeId(key);
    return new Promise(async function(resolve, reject) {
      try {
        const { code, msg, data } = await financingRepurchaseService.getPFTree({
          key,
        });
        if (code === 200) {
          if (data) {
            const fn = array => {
              if (!array || !array.length) return;
              array.forEach(item => {
                item.icon = item.isPF ? <FileOutlined /> : <FolderOpenOutlined />;
                // item.isLeaf = item.isPF;
                item.isLeaf = item.isTreeOfLeaf === '1';
                if (item.children && item.children.length) {
                  fn(item.children);
                }
              });
            };

            await fn(data);
            resolve(data || []);
          }
          resolve([]);
        } else {
          message.error(msg);
          resolve([]);
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  // 点击复选框
  const onCheckTree = (checkedNodes: any) => {
    setCheckedNodes(checkedNodes);
  };

  return (
    <TreeComponent
      isMark={isMark}
      fetchMarkTree={getMarkPfTree}
      fetchTreeTypeOptions={fetchTreeTypeOptions}
      fetchTree={fetchTree}
      onCheck={onCheckTree}
    />
  );
});

export default PFTree;
