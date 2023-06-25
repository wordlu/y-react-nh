import React, { useCallback, useEffect, useRef, useMemo, useState, useContext } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Form, DatePicker, Select, Input, Button, message, Space } from 'antd';
import moment from 'moment';
import { Loading } from '@lugia/lugia-web';
import { getHocComp } from '@/utils'; //所有传递了models值的组件
import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import { Container } from '@/constant/style';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import FirstTable from '../first-table';
import { financingRepurchaseService } from '@/config/di.config';

import './index.css';

const FinancingRepurchase: React.FC = ({
  asyncBizdictAdd,
  asyncMainTableSearch,
  asyncOptionsSearch,
  updateIsShowModalInTime,
}) => {
  const [form] = Form.useForm();

  const [tableData, setTableData] = useState<any[] | null>(null);

  const [height, setHeight] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<any>({
    date: [],
    pfIds: [],
  });

  const [options, setOptions] = useState([
    {
        "code": 1,
        "name": "开启"
    },
    {
        "code": 2,
        "name": "停用"
    }
  ])

  const [loading, setLoading] = useState<boolean>(false);

  const [pagination, setPagination] = useState<any>({
    total: 0,
    pageNo: 1,
    pageSize: 30,
  });

  // useEffect(() => {
  //   const heights = document.getElementById('financing-repurchase-container')?.offsetHeight;
  //   setHeight(heights ? heights - 100 + 'px' : null);
  // }, []);

  // 触发查询按钮
  const getFormValues = values => {
    setFormValues({ ...values });
    let pfIds;
    if (values.pfIds) {
      pfIds = values.pfIds?.map(item => ({ pfId: item?.value, pfName: item?.label }));
    }
    onSearch({
      startDate: moment(values.date[0] ? values.date[0] : undefined).format('YYYYMMDD'),
      endDate: moment(values.date[1] ? values.date[1] : undefined).format('YYYYMMDD'),
      pfIds,
      pageSize: pagination.pageSize,
      pageNo: pagination.pageNo,
    });
  };

  // 查询
  const onSearch = async params => {
    setLoading(true);
    try {
      const { data, code, msg, total } = await financingRepurchaseService.riskMonitoring(params);
      if (code === 200) {
        setTableData(data);
        setPagination({
          pageNo: params.pageNo,
          pageSize: params.pageSize,
          total,
        });
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  // 分页
  const onChange = (pageNo, pageSize) => {
    if (formValues.date) {
      setPagination({
        ...pagination,
        pageNo,
        pageSize,
      });

      let pfIds;
      if (formValues.pfIds) {
        pfIds = formValues.pfIds?.map(item => ({ pfId: item?.value, pfName: item?.label }));
      }

      onSearch({
        startDate: moment(formValues.date[0] ? formValues.date[0] : undefined).format('YYYYMMDD'),
        endDate: moment(formValues.date[1] ? formValues.date[1] : undefined).format('YYYYMMDD'),
        pfIds,
        pageNo,
        pageSize,
      });
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  // 取消
  const on_click_cancel = async () => {
    updateIsShowModalInTime && updateIsShowModalInTime(false);
    form.resetFields()
    cRef1.current.setDataSource([])
  }

  // 提交
  const on_click_submit = async () => {
    let formStatus = false;
    await form
      .validateFields()
      .then(values => {
        formStatus = true;
      })
      .catch(err => {
        console.log(err);
      });
    if (!formStatus) return;
    const tableArr = cRef1.current.dataSource
    if (tableArr.length > 0) {

      // 1. 判断子项名称必填
      const mustNum1 = tableArr.filter(it => it.dictItemName === '')
      if (mustNum1.length > 0){
        message.error("子项名称不能为空!")
        return;
      }
      // 2. 判断子项值必填
      const mustNum2 = tableArr.filter(it => it.dictItemCode === '')
      if (mustNum2.length > 0){
        message.error("子项值不能为空!")
        return;
      }

      // 2. 判断备注长度
      const num = tableArr.filter(it => it.remark.length > 25)
      if (num.length > 0){
        message.error("备注字段输入超过长度限制!")
        return;
      }

      // 3.判断相同子项
      const codeArr = tableArr.map(it => it.dictItemCode)
      const arrSet = new Set(codeArr)
      if (arrSet.size !== codeArr.length) {
        message.error('请修改相同子项值!');
        return;
      }
    }
    const formParam = form.getFieldsValue(true)
    const data = {
      "dictName": formParam.dictName,
      dictCode: formParam.dictCode,
      "state": formParam.state,
      "remark": formParam.remark,
      "items": tableArr.map(item => {
        return {
          "dictItemName": item.dictItemName,
          "dictItemCode": item.dictItemCode,
          "state": item.state,
          "remark": item.remark
        }
      })
    }
    asyncBizdictAdd && (await asyncBizdictAdd(data));
    asyncMainTableSearch && (await asyncMainTableSearch())
    asyncOptionsSearch && (await asyncOptionsSearch())
    // 恢复弹窗状态
    updateIsShowModalInTime && updateIsShowModalInTime(false);
    form.resetFields()
    cRef1.current.setDataSource([])
  }

  const cRef1 = useRef(null)

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <Form
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 16 }}
          size="middle"
          className="add-bizdict-form"
        >
          <Form.Item
            label="字典项"
            name="dictName"
            className='dictName-input'
            rules={[
              {
                required: true,
                message: '不能为空!',
              },
            ]}
          >
            <Input placeholder="请输入字典项名称" />
          </Form.Item>
          <Form.Item
            label="字典编码"
            name="dictCode"
            size="middle"
            className='state-sel'
            rules={[
              {
                required: true,
                message: '不能为空!',
              },
            ]}
          >
             <Input placeholder="请输入字典编码" maxLength={50}/>
          </Form.Item>
          <Form.Item
            label="状态"
            name="state"
            size="middle"
            className='state-sel'
            rules={[
              {
                required: true,
                message: '不能为空!',
              },
            ]}
          >
            <Select
              placeholder="请选择"
            >
              {options?.map(item => (
                <Select.Option key={item.code} children={item.name} value={item.code} />
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
            size="middle"
            className='state-sel'
          >
            <Input placeholder="请输入备注" />  
          </Form.Item>
        </Form>

        <FirstTable
          ref={cRef1}
          ewOptions={options}
        />
        <div className="financing-repurchase-pagination">
          <Button type='primary' onClick={on_click_submit}>提交</Button>
          <Button onClick={on_click_cancel}>取消</Button>
        </div>
      </Container>
    </ConfigProvider>
  );
};

export default getHocComp(FinancingRepurchase);
