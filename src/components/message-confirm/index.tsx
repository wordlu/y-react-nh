import { Message, Modal } from 'antd';
import React, {} from 'react';


interface propsType {
  title: string;
  isVisible: boolean;
  handleOK: () => void;
  handleCancel?: () => void;
  copywriting?: string;
}

const messageConfirm: React.FC<PoolNameContextProps> = ({
  title,
  isVisible,
  handleOK,
  handleCancel,
  copywriting
}) => {
  return (
    <Modal
      title={title}
      maskClosable={false}
      visible={isVisible}
      onOk={handleOK}
      onCancel={handleCancel}
      className="message-confirm"
    >
      <div style={{ textAlign: 'center' }}>
        {
          copywriting ? copywriting : '您确定要删除选中数据吗？'
        }
      </div>
    </Modal>
  )
}

export default messageConfirm