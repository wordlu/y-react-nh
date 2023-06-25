import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, DatePicker, Input, Button, Select, message } from 'antd';
import moment from 'moment';

import { getHocComp } from '@/utils';
import DebounceSelect from '@/components/debounce-select';
import SelectPagination from '@/components/select-pagination';

import './index.css';
import { earlyWarningDetailsService, earlyWarningProgramService } from '@/config/di.config';

const Container = styled.div`
  // background: rgb(245, 247, 250);
  // background: #eef1f6;
  padding: 5px;
  // border-bottom: 1px solid rgb(245, 247, 250);
`;

const dateFormat = 'YYYY-MM-DD';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

// const defaultFormData = {
//   searchDate: moment()
//     .subtract(1, 'days')
//     .calendar(),
//   earlyWarnPool: [],
//   earlyWarnPlan: [],
//   holdPositionStatus: null,
//   defaultStatus: null,
//   mainName: [],
// };

const FormContainer: React.FC = ({
  formData,
  bizdictPositionData,
  bizdictDefaultData,
  defaultEarlyWarnPlansData,
  searchSelectData,
  earlyWarnPoolsData,
  earlyWarnPlansData,
  asyncHandleSearch,
  updateIsShowModalInTime,
  updateCurrentRowInTime,
  updateFormData,
  updateDefaultEarlyWarnPlansData,
  asyncHandleDistribution,
  updateSelectExcelParams,
  updatePageNoInTime,
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
          updateDefaultEarlyWarnPlansData(arr);
          updateFormData({
            searchDate: moment().subtract(1, 'days'),
            earlyWarnPool: null,
            earlyWarnPlan: earlyWarnCaseId,
            holdPositionStatus: null,
            defaultStatus: null,
            mainName: [],
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
          case 'earlyWarnPool':
            key = 'getEarlyWarnPools';
            break;
          case 'earlyWarnPlan':
            key = 'getEarlyWarnPlans';
            break;
          case 'mainName':
            key = 'getMainNames';
            break;
        }
        const { code, msg, data, total } = await earlyWarningDetailsService[key]({
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
      earlyWarnPool: value.earlyWarnPool ? value.earlyWarnPool.value : null,
      earlyWarnPlan: value.earlyWarnPlan ? value.earlyWarnPlan.value : null,
    };
    // const params = {
    //   ...value,
    //   earlyWarnPool: value.earlyWarnPool ? value.earlyWarnPool : null,
    //   earlyWarnPlan: value.earlyWarnPlan ? value.earlyWarnPlan : null,
    // };
    updateIsShowModalInTime && updateIsShowModalInTime(false);
    updateCurrentRowInTime && updateCurrentRowInTime({});
    updateFormData && updateFormData(params);
    updatePageNoInTime && updatePageNoInTime(1);
    asyncHandleSearch && asyncHandleSearch(params);
    asyncHandleDistribution && asyncHandleDistribution();

    const selectLabel = {
      earlyWarnPoolLabel: value.earlyWarnPool ? value.earlyWarnPool.label : '',
      earlyWarnPlanLabel: value.earlyWarnPlan ? value.earlyWarnPlan.label : '',
    };
    updateSelectExcelParams && updateSelectExcelParams(selectLabel);
  };

  return (
    <Container>
      <Form
        {...layout}
        form={form}
        initialValues={{
          searchDate: moment().subtract(1, 'days'),
          earlyWarnPool: null,
          earlyWarnPlan: defaultEarlyWarnPlan,
          // earlyWarnPlan: defaultEarlyWarnPlan?.value || null,
          holdPositionStatus: null,
          defaultStatus: null,
          mainName: [],
        }}
        onFinish={onSearch}
        className="early-warning-details-form-search"
      >
        <Row gutter={24}>
          <Col span={7}>
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
          <Col span={7}>
            <Form.Item label="预警池" name="earlyWarnPool">
              {/* <Select placeholder="请选择预警池" allowClear>
                {searchSelectData.earlyWarnPool?.map(item => (
                  <Select.Option children={item.name} value={item.code} />
                ))}
              </Select> */}
              {/* <DebounceSelect
                // ref={debounceSelectRef}
                showSearch
                allowClear
                // mode="multiple"
                maxTagCount="responsive"
                placeholder="请查询"
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="name"
                labelInValue={true}
                fetchOptions={(value: string, current: number) =>
                  fetSchemaList(value, 'earlyWarnPool', current)
                }
                // maxTagCount="responsive"
                style={{ width: '100%' }}
              /> */}
              <Select
                placeholder="请查询"
                allowClear
                showSearch
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                labelInValue={true}
                optionLabelProp="name"
                optionFilterProp="name"
                options={earlyWarnPoolsData}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={7}>
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
              >
                {/* {earlyWarnPlansData?.map(item => (
                  <Select.Option children={item.name} value={item.code} />
                ))} */}
              </Select>
              {/* <DebounceSelect
                ref={debounceSelectRef}
                showSearch
                allowClear
                // mode="multiple"
                maxTagCount="responsive"
                placeholder="请查询"
                fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                optionLabelProp="name"
                labelInValue={true}
                fetchOptions={(value: string, current: number) =>
                  fetSchemaList(value, 'earlyWarnPlan', current)
                }
                // maxTagCount="responsive"
                style={{ width: '100%' }}
              /> */}
            </Form.Item>
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={7}>
            <Form.Item label="是否持仓" name="holdPositionStatus">
              <Select placeholder="请选择" allowClear>
                {bizdictPositionData?.map(item => (
                  <Select.Option children={item.name} value={item.code} />
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="是否违约" name="defaultStatus">
              <Select placeholder="请选择" allowClear>
                {bizdictDefaultData?.map(item => (
                  <Select.Option children={item.name} value={item.code} />
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="主体名称" name="mainName">
              {/* <DebounceSelect
                // ref={debounceSelectRef}
                // showSearch
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
                style={{ width: '100%' }}
                pagination={{
                  totalElements: selectPageCount > 0 ? selectPageCount : 1,
                  pageSize: selectPageSize,
                }}
              />
            </Form.Item>
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Form.Item>
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
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default getHocComp(FormContainer);
