import React, { useEffect, useState, useRef } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider, message } from 'antd';
import { earlyWarningProgramService } from '@/config/di.config';
import { Container } from '@/constant/style';
import Search from './components/search';
import Table from './components/table';
import Email from './components/email';
import './index.css';

const EarlyWarningScheme = () => {
  const [queryObj, setQueryObj] = useState({});
  const [state, setState] = useState([]);
  const [dimension, setDimension] = useState([]);
  const [isVisible, setIsVisible] = useState(false)

  const modalRef = useRef();

  useEffect(() => {
    getSendDimension();
    getStatelist();
  }, []);

  const setModalConfirme = (bool) => {
    setIsVisible(bool)
  }

  // 获取发送维度数据
  const getSendDimension = async () => {
    try {
      const { code, msg, data } = await earlyWarningProgramService.getEmailList();
      if (code === 200) {
        setDimension(data || []);
      } else {
        setDimension([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 获取状态
  const getStatelist = async () => {
    try {
      const { code, msg, data } = await earlyWarningProgramService.statelist();
      if (code === 200) {
        setState(data || []);
      } else {
        setState([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSearchChange = (value: any) => {
    setQueryObj(value);
    modalRef.current &&
      modalRef.current.updatePaginationPageNo &&
      modalRef.current.updatePaginationPageNo(1);

    modalRef.current?.clearSelectedRowKeys &&
      typeof modalRef.current?.clearSelectedRowKeys === 'function' &&
      modalRef.current?.clearSelectedRowKeys([]);
  };

  const add = () => {
    modalRef.current && modalRef.current.showModal && modalRef.current.showModal();
  };

  const deleteEmail = async () => {
    if (
      !modalRef.current?.selectedRowKeys ||
      (modalRef.current?.selectedRowKeys && modalRef.current.selectedRowKeys.length === 0)
    ) {
      message.warning('请选择要操作的数据!');
    } else {
      try {
        const { code, msg } = await earlyWarningProgramService.alertEmailState({
          state: 9,
          ids: modalRef.current.selectedRowKeys,
        });
        if (code === 200) {
          message.success(msg);
          modalRef.current?.getList && modalRef.current.getList();
          modalRef.current?.clearSelectedRowKeys &&
          typeof modalRef.current?.clearSelectedRowKeys === 'function' &&
          modalRef.current?.clearSelectedRowKeys([]);
          setModalConfirme(false)
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <Search
          dimension={dimension}
          state={state}
          isVisible={isVisible}
          onSearch={onSearchChange}
          setModalConfirme={setModalConfirme}
          add={add}
          deleteEmail={deleteEmail}
        />
        <div className="email-body">
          <Table ref={modalRef} dimension={dimension} state={state} searchData={queryObj} />
          <Email searchData={queryObj} />
        </div>
      </Container>
    </ConfigProvider>
  );
};

export default EarlyWarningScheme;
