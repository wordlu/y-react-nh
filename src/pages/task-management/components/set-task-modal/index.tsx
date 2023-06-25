import React, { useEffect, useRef } from 'react';
import { Button, Modal, Input, Form, Select } from 'antd';
import { getHocComp } from '@/utils';

const { TextArea } = Input;

const SetTaskModal: React.FC<any> = (props: any) => {
  const {
    planData,
    visibleModal,
    modalType,
    setVisibleModal,
    groupData,
    taskNameData,
    asyncOpModify,
    asyncOpTable,
    editInfoData,
    setEditInfoData,
  } = props;
  const [form] = Form.useForm();
  const formRef = useRef();
  const RunModalContent = () => {
    return (
      <>
        <Form.Item
          wrapperCol={{ offset: 0, span: 24 }}
          name="parameter"
          rules={[{ required: true, message: '执行参数不得为空!' }]}
          getValueFromEvent={(e)=>{
            return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
          }}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
          <Button
            type="primary"
            onClick={async () => {
              const res = await form.validateFields();
              asyncOpTable(res);
            }}
          >
            执行
          </Button>
          <Button onClick={() => setVisibleModal(false)}>取消</Button>
        </Form.Item>
      </>
    );
  };
  const AddModalContent = () => {
    return (
      <>
        <Form.Item
          label="任务名称"
          name="jobName"
          rules={[{ required: true, message: '任务名称不得为空!' }]}
          getValueFromEvent={(e)=>{
            return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
          }}
        >
          <Input placeholder="请输入任务名称" />
        </Form.Item>

        <Form.Item
          label="所属分组"
          name="jobGroup"
          rules={[{ required: true, message: '所属分组不得为空!' }]}
        >
          <Select allowClear placeholder="请选择所属分组">
            {groupData?.map(item => (
              <Select.Option children={item.name} value={item.code} />
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="服务名称"
          name="jobInfos"
          rules={[{ required: true, message: '服务名称不得为空!' }]}
        >
          <Select placeholder="请选择服务名称">
            {taskNameData?.map(item => (
              <Select.Option children={item.code} value={item.name} />
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="执行计划"
          name="planId"
          // initialValue={''}
          rules={[{ required: true, message: '执行计划不得为空!' }]}
        >
          <Select placeholder="请选择执行计划">
            {planData?.map(item => (
              <Select.Option children={item.planName} value={item.id} />
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="重叠执行"
          name="concurrent"
          initialValue="0"
          rules={[{ required: true, message: '重叠执行不得为空!' }]}
        >
          <Select
            options={[
              {
                value: '0',
                label: '否',
              },
              {
                value: '1',
                label: '是',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="任务参数"
          name="params"
          rules={[{ required: true, message: '任务参数不得为空!' }]}
          getValueFromEvent={(e)=>{
            return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
          }}
        >
          <Input.TextArea placeholder="请输入任务参数" />
        </Form.Item>
        <Form.Item
          label="备注"
          name="remark"
          getValueFromEvent={(e)=>{
            return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
          }}
        >
          <Input placeholder="请输入备注" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
          <Button
            type="primary"
            onClick={async () => {
              let res = await form.validateFields();
              if (modalType === "编辑") {
                res.status = editInfoData.status
              }
              asyncOpModify(res);
            }}
          >
            提交
          </Button>
          <Button 
            style={{marginLeft: 20,}}
            onClick={() => setVisibleModal(false)}>取消</Button>
        </Form.Item>
      </>
    );
  };
  useEffect(() => {
    if (!visibleModal) {
      setEditInfoData();
      formRef?.current?.resetFields();
    }
  }, [visibleModal]);
  useEffect(() => {
    if (editInfoData.id && visibleModal) {
      let infos = editInfoData.jobInfos.map(item => item.code);
      editInfoData.jobInfos = infos;
      editInfoData.planId = editInfoData.scheduleId;
      formRef?.current?.setFieldsValue(editInfoData);
    }
  }, [editInfoData]);

  return (
    <Modal
      title={modalType}
      maskClosable={false}
      visible={visibleModal}
      onCancel={() => {
        setVisibleModal(false);
      }}
      width={'35%'}
      footer={null}
    >
      <div>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 21 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          ref={formRef}
        >
          {modalType === '参数执行' ? <RunModalContent /> : <AddModalContent />}
        </Form>
      </div>
    </Modal>
  );
};

export default getHocComp(SetTaskModal);
