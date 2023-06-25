import React, { useEffect, forwardRef, useState, useImperativeHandle } from "react"
import { Container, NavTitle, Content, ContentItem, Footer, } from './style'
import {
  ConfigProvider,
  Form,
  Select,
  Button,
  message,
  Tree,
  Empty,
  Input,
  Modal
} from 'antd';
import { SearchOutlined, FolderOpenOutlined, FileOutlined, PlusSquareOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.css'
import TreeTable from '../comboTreeTableModal'
import { userAuthService } from '@/config/di.config';
import { Loading } from '@lugia/lugia-web';
import { sm4utils } from '@utils/sm4/SM4'

import {
  Container,
  LeftContainer,
  SelectContainer,
  TreeContainer,
  EmptyContainer,
} from '@/pages/liquidity-exposure/style';

const EditComboTree: React.FC = forwardRef(({
  dealAddClick,
}, ref) => {
  useImperativeHandle(ref, () => ({
    clearTree: clearTree
  }))
  const [treeData, setTreeData] = useState<any[] | undefined>([]);
  const [originTreeData, setOriginTreeData] = useState<any[] | undefined>(undefined);
  const [isCtrl, setIsCtrl] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const sKey="86C63180C2806ED1F47B859DE501215B"
  const sm4 = new sm4utils(sKey);

  const { TextArea } = Input;

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  // 清空数据
  const clearTree = () => {
    form1.resetFields()
    form2.resetFields()
    setTreeData([]);
  }

  // 生成组合树
  const makeTree = async () => {
    let form1Status = false;
    let form2Status = false;
    await form1
      .validateFields()
      .then(values => {
        form1Status = true;
      })
      .catch(err => {
        console.log(err);
      });

    await form2
      .validateFields()
      .then(values => {
        form2Status = true;
      })
      .catch(err => {
        console.log(err);
      });
    if (!form1Status || !form2Status) { 
      return;
    }
    setLoading(true);
    setTreeData([]);
    setOriginTreeData(null);
    const formValue1 = form1.getFieldsValue(true)
    const formValue2 = form2.getFieldsValue(true)
    try {
      // sm4加密
      const data_sm4=sm4.encryptData_ECB(formValue2?.treeSql);
      const params = {
        'treeName': formValue1.treeName,
        'treeSql': data_sm4
      }
      const { code, msg, data } = await userAuthService.makeCompositeTree(params); 
      const dataArr = [data]
      const treeArr = []
      const treeArrData = []
      if (code === 200) {
        setOriginTreeData(JSON.parse(JSON.stringify(data)))
        // 处理tree数据
        const fn = array => {
          if (!array || !array.length) return;
          array.forEach(item => {
            item.icon = item.isPF ? <FileOutlined /> : <FolderOpenOutlined />;
            item.title = item.nodeName
            item.key = item.nodeCode
            item.children = item.child
            item.isLeaf = ''
            if (item.auth === '1') {
              treeArr.push(item.key)
              treeArrData.push(item)
            }
            if (item.children && item.children.length) {
              fn(item.children);
            }
          });
        };
        await fn(dataArr);
        setTreeData(dataArr);
      } else {
        message.error(msg);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  // 保存组合树
  const saveTree = async () => {
    if (!treeData || treeData?.length < 1) {
      message.error("请生成正确的组合树!")
      return;
    }
    const formValue1 = form1.getFieldsValue(true)
    const formValue2 = form2.getFieldsValue(true)
    try {
      const { code, msg, data } = await userAuthService.saveCompositeTree({
        'treeName': formValue1.treeName,
        'treeSql': sm4.encryptData_ECB(formValue2?.treeSql),
        'treeNode': originTreeData
      }); 
     
      if (code === 200) {
        message.success("保存成功!");
        dealAddClick()
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <NavTitle>
        <Form
          name="basic"
          form={form1}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 32 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="组合树名称"
            name="treeName"
            rules={[{ required: true, message: '请输入组合树名称' }]}
          >
            <Input />
          </Form.Item>
          </Form>
      </NavTitle>

      <Content>
        <Form
          className="add-sql-area"
          name="treeSql"
          form={form2}
        >
          <ContentItem>
            <div className="sql-text">
              <Form.Item
                name="treeSql"
                rules={[{ required: true, message: '请输入sql语句' }]}
              >
                <TextArea rows={40} placeholder="请输入sql语句" />
              </Form.Item>
            </div>
          </ContentItem>
          <ContentItem>
            <div className="tree-area">
              <TreeContainer id="tree">
                <Loading loading={loading} isInherit={true}>
                  {treeData?.length ? (
                    <Tree
                      checkable
                      showIcon
                      checkStrictly={!isCtrl}
                      selectable={false}
                      defaultExpandAll
                      autoExpandParent={true}
                      treeData={treeData}
                      className="tree"
                    />
                  ) : (
                    <EmptyContainer>
                      <Empty/>
                    </EmptyContainer>
                  )}
                </Loading>
              </TreeContainer>
            </div>
          </ContentItem>
        </Form>
      </Content>
      <Footer>
        <Button type="primary" onClick={makeTree}>生成组合树</Button>
        <Button type="primary" onClick={saveTree}>保存组合树</Button>
      </Footer>
    </Container>
  )
})

export default EditComboTree;