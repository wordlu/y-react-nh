import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, DatePicker, Input, Button, Select, message, Space } from 'antd';
import moment from 'moment';

import { getHocComp } from '@/utils';
import { objTransformFormDada } from '@/utils/helper';
import DebounceSelect from '@/components/debounce-select';
import SelectPagination from '@/components/select-pagination';

import './index.css';
import {
  earlyWarningDetailsService,
  earlyWarningProgramService,
  setAlertPoolService,
} from '@/config/di.config';

const Container = styled.div`
  // background: rgb(245, 247, 250);
  // background: #eef1f6;
  padding: 5px;
  // border-bottom: 1px solid rgb(245, 247, 250);
`;

const dateFormat = 'YYYY-MM-DD';
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

const selectProps = {
  // mode: 'multiple',
  style: { width: '100%' },
  placeholder: '请查询',
  maxTagCount: 'responsive',
  allowClear: true,
  showSearch: true,
  optionFilterProp: 'label',
};

const FormContainer: React.FC = ({
  formData,
  earlyWarnPlanLabel,
  tableData,
  selectOptions,
  crsScoreData,
  crsScore5DData,
  crsScore30DData,
  earlyWarnPlansData,
  defaultEarlyWarnPlansData,
  compositeTreeConditionsData,
  updatePositionFormData,
  updatePositionDefaultEarlyWarnPlansData,
  asyncGetPositionTableInit,
  updatePositionEarlyWarnPlanLabel,
  updatePositionPageNoInTime,
}) => {
  const [form] = Form.useForm();
  const debounceSelectRef = useRef();

  const [defaultEarlyWarnPlan, setDefaultEarlyWarnPlan] = useState<any>({});
  const [selectPageCount, setSelectPageCount] = useState<number>(0);
  const [selectPageSize, setSelectPageSize] = useState<number>(100);

  useEffect(() => {
    (async () => {
      try {
        const {
          code,
          msg,
          earlyWarnCaseId,
          earlyWarnCaseName,
        } = await earlyWarningProgramService.getDetails({
          earlyWarnCaseId: '',
        });
        if (code === 200 && earlyWarnCaseId && earlyWarnCaseName) {
          const arr = [{ code: earlyWarnCaseId, name: earlyWarnCaseName }];
          updatePositionDefaultEarlyWarnPlansData(arr);
          updatePositionFormData({
            searchDate: moment().subtract(1, 'days'),
            consignorId: null,
            managerId: null,
            entrustId: null,
            pfIds: [],
            mainName: [],
            earlyWarnPlan: earlyWarnCaseId,
            crsScore: [],
            crsScore5D: [],
            crsScore30D: [],
          });
          // setDefaultEarlyWarnPlan(earlyWarnCaseId);
          setDefaultEarlyWarnPlan({
            key: earlyWarnCaseId,
            label: earlyWarnCaseName,
            value: earlyWarnCaseId,
          });
          form.resetFields();
          form.submit();
          if (debounceSelectRef?.current && debounceSelectRef.current?.defaultOptions) {
            debounceSelectRef.current.defaultOptions(arr || []);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // 预警池模糊查询
  const fetSchemaList = async (value: string, type: string, current: number) => {
    return new Promise(async function(resolve, reject) {
      // if (!value) {
      //   resolve([]);
      // } else {
        try {
          let key;
          switch (type) {
            case 'pfIds':
              key = 'getCompositeTreeConditions';
              break;
            case 'earlyWarnPlan':
              key = 'getEarlyWarnPlans';
              break;
            case 'mainName':
              key = 'getMainNames';
              break;
          }
          const { code, msg, data, total } =
            key === 'getCompositeTreeConditions'
              ? await setAlertPoolService[key]({ pfName: value })
              : await earlyWarningDetailsService[key]({
                  name: value,
                  pageNo: current,
                  pageSize: selectPageSize,
                });
          if (code === 200) {
            setSelectPageCount(total);
            resolve(data);
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      // }
    });
  };

  const onSearch = value => {
    const params = {
      ...value,
      earlyWarnPlan: value.earlyWarnPlan ? value.earlyWarnPlan.value : null,
      // earlyWarnPlan: value.earlyWarnPlan ? value.earlyWarnPlan : null,
    };
    updatePositionFormData && updatePositionFormData(params);
    updatePositionPageNoInTime && updatePositionPageNoInTime(1);
    asyncGetPositionTableInit && asyncGetPositionTableInit(params);

    updatePositionEarlyWarnPlanLabel &&
      updatePositionEarlyWarnPlanLabel(value.earlyWarnPlan ? value.earlyWarnPlan.label : '');
  };

  const exportExcel = () => {
    if (!tableData?.length) {
      message.info('暂无数据可导出');
      return;
    }

    const data = objTransformFormDada({
      data: JSON.stringify(tableData),
      searchDate: moment(formData.searchDate).format('YYYYMMDD'),
      earlyWarnPlan: earlyWarnPlanLabel,
    });

    earlyWarningDetailsService.exportPositions(data);
  };

  return (
    <Container>
      <Form
        {...layout}
        form={form}
        initialValues={{
          searchDate: moment().subtract(1, 'days'),
          consignorId: null,
          managerId: null,
          entrustId: null,
          pfIds: [],
          mainName: [],
          earlyWarnPlan: defaultEarlyWarnPlan,
          // earlyWarnPlan: defaultEarlyWarnPlan?.value || null,
          crsScore: [],
          crsScore5D: [],
          crsScore30D: [],
        }}
        onFinish={onSearch}
        className="early-warning-details-form-search"
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label="日期"
              name="searchDate"
              rules={[
                {
                  required: true,
                  message: '不能为空!',
                },
              ]}
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="委托人" name="consignorId">
              <Select {...selectProps} options={selectOptions.wtr} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="投管人" name="managerId">
              <Select {...selectProps} options={selectOptions.tgr} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="受托人" name="entrustId">
              <Select {...selectProps} options={selectOptions.str} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="组合名称" name="pfIds">
              <Select
                placeholder="请查询"
                allowClear
                showSearch
                mode="multiple"
                maxTagCount="responsive"
                // fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="label"
                optionFilterProp="label"
                options={compositeTreeConditionsData}
              ></Select>
              {/* <DebounceSelect
                allowClear
                mode="multiple"
                maxTagCount="responsive"
                placeholder="请查询"
                // fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="label"
                fetchOptions={(value: string) => fetSchemaList(value, 'pfIds')}
                // maxTagCount="responsive"
                style={{ width: '100%' }}
              /> */}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="主体名称" name="mainName">
              {/* <DebounceSelect
                allowClear
                mode="multiple"
                maxTagCount="responsive"
                placeholder="请查询"
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="name"
                fetchOptions={(value: string) => fetSchemaList(value, 'mainName')}
                // maxTagCount="responsive"
                style={{ width: '100%' }}
              /> */}
              <SelectPagination
                allowClear
                mode="multiple"
                maxTagCount="responsive"
                placeholder="请查询"
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="name"
                fetchOptions={(value: string, current: number) =>
                  fetSchemaList(value, 'mainName', current)
                }
                // maxTagCount="responsive"
                style={{ width: '100%' }}
                pagination={{
                  totalElements: selectPageCount > 0 ? selectPageCount : 1,
                  pageSize: selectPageSize,
                }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="预警方案"
              name="earlyWarnPlan"
              rules={[
                {
                  required: true,
                  message: '不能为空!',
                },
              ]}
            >
              <Select
                placeholder="请查询"
                allowClear
                showSearch
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="name"
                optionFilterProp="name"
                labelInValue={true}
                options={earlyWarnPlansData}
              ></Select>
              {/* <DebounceSelect
                ref={debounceSelectRef}
                showSearch
                allowClear
                maxTagCount="responsive"
                placeholder="请查询"
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="name"
                labelInValue={true}
                fetchOptions={(value: string) => fetSchemaList(value, 'earlyWarnPlan')}
                style={{ width: '100%' }}
              /> */}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="本日信用压力" name="crsScore">
              <Select
                placeholder="请选择"
                mode="multiple"
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="name"
                options={crsScoreData}
                allowClear
                maxTagCount="responsive"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="五日内信用压力" name="crsScore5D">
              <Select
                placeholder="请选择"
                mode="multiple"
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="name"
                options={crsScore5DData}
                allowClear
                maxTagCount="responsive"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="三十日内信用压力" name="crsScore30D">
              <Select
                placeholder="请选择"
                mode="multiple"
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="name"
                options={crsScore30DData}
                allowClear
                maxTagCount="responsive"
              />
            </Form.Item>
          </Col>
          <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    setTimeout(() => {
                      if (debounceSelectRef?.current && debounceSelectRef.current?.defaultOptions) {
                        debounceSelectRef.current.defaultOptions(defaultEarlyWarnPlansData || []);
                      }
                    }, 100);
                  }}
                >
                  重置
                </Button>
                <Button type="primary" onClick={exportExcel}>
                  导出
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default getHocComp(FormContainer);
