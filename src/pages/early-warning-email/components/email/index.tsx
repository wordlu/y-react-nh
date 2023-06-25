import React, { useEffect, useState } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Collapse, Modal, Popover } from 'antd';
import { earlyWarningProgramService } from '@/config/di.config';
import m from 'moment';

import Pagination from '@/components/pagination';

import './index.css';

const { Panel } = Collapse;

const Email: React.FC = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState([]);
  const [item, setItem] = useState({});
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pagination, setPagination] = useState<any>({
    total: 0,
    pageNo: 1,
    pageSize: 30,
  });

  // useEffect(() => {
  //   getList();
  // }, [current]);

  useEffect(() => {
    getList();
  }, [pagination.pageNo, pagination.pageSize]);

  const getList = async () => {
    try {
      const { code, msg, data, total } = await earlyWarningProgramService.emailPageList({
        page: pagination.pageNo,
        rows: pagination.pageSize,
      });
      if (code === 200) {
        setList(data || []);
        setPagination({ ...pagination, total });
      } else {
        setList([]);
      }
      // setList(res.value.records);
      // setTotal(res.value.total);
    } catch (err) {
      console.log(err);
      setList([]);
    }
    // earlyWarningProgramService.emailPageList({ page: current }).then(res => {
    //   setList(res.value.records);
    //   setTotal(res.value.total);
    // });
  };

  const showModal = e => {
    setItem(e);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (pageNo, pageSize) => {
    setPagination({
      ...pagination,
      pageNo,
      pageSize,
    });
  };

  // const onChange = (value: any) => {
  //   setCurrent(value);
  // };

  const handleClickExcel = async () => {
    try {
      const res = await earlyWarningProgramService.alertEmailFile({
        id: item.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <div className="email_list">
        <div className="email_title">已发送邮件</div>
        <div className="email-container">
          {list.map(item => {
            return (
              <div
                className="listItem"
                onDoubleClick={() => {
                  showModal(item);
                }}
              >
                <div className="email-item-content">
                  <Popover content={item.recipient} placement={'topLeft'}>
                    <div className="listItemTitle">{item.recipient}</div>
                  </Popover>

                  <div className="time">
                    {item.sendTime ? m(item.sendTime).format('YYYY-MM-DD') : ''}
                  </div>
                </div>

                <Popover content={item.title} placement={'topLeft'}>
                  <div className="email_title_name">{item.title}</div>
                </Popover>
              </div>
            );
          })}
        </div>
        <div className="paginationList">
          {/* <Pagination
            current={current}
            // size="small"
            total={total}
            pageSize={30}
            onChange={onChange}
          /> */}
          <Pagination
            total={pagination.total}
            currentPage={pagination.pageNo}
            pageSize={pagination.pageSize}
            pageSizeOptions={[30, 50, 100]}
            onChange={onChange}
          />
        </div>
      </div>
      <Modal
        title={item.title}
        width={800}
        visible={isModalOpen}
        maskClosable={false}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="msg-body">
          <div className="msg">
            <span className="msg-pre">发件人：</span>
            <div className="msg-content">{item.createId}</div>
          </div>
          <div className="msg">
            <span className="msg-pre">收件人：</span>
            <div className="msg-content">{item.recipient}</div>
          </div>
          <div className="msg">
            <span className="msg-pre">抄送：</span>
            <div className="msg-content">{item.carbonCopy}</div>
          </div>
          <div className="msg">
            <span className="msg-pre">时间：</span>
            <div className="msg-content">{m(item.startTime).format('YYYY-MM-DD')}</div>
          </div>
          <div className="msg">
            <span className="msg-pre">大小：</span>
            <div className="msg-content">{item.fileSize}</div>
          </div>
        </div>
        {item.fileName && (
          <div className="excel">
            <span className="msg-pre">附件：</span>
            <a onClick={handleClickExcel}>{item.fileName}</a>
            <span style={{ marginLeft: '5px' }}>{item.fileSize && `(${item.fileSize})`}</span>
          </div>
        )}
        <div className="context">
          {/* <div className="context_title">正文内容</div> */}
          <div className="email-content">{item.body}</div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default Email;
