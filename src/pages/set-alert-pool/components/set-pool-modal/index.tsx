import React, { ReactDOM, useEffect, useMemo, useRef, useState } from 'react';
import {
  Divider,
  Input,
  Button,
  Modal,
  Spin,
  Empty,
  Tooltip,
  message,
  ConfigProvider,
  Space,
  Upload,
  Select,
  Form,
  Row,
  Col,
} from 'antd';
import { CloseOutlined, EditOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import zh_CN from 'antd/es/locale/zh_CN';

import FoldModal from '@/components/fold-modal';
import PollItem from './components/poll-item';
import { getHocComp } from '@/utils';
import { setAlertPoolService } from '@/config/di.config';
import { go } from '@utils/cusRouter';
import TableComponent from '@/components/table';
import { downloadFile, objTransformFormDada } from '@/utils/helper';
import DebounceSelect from '@/components/debounce-select';
import Pagination from '@/components/pagination';

import './index.css';

interface PoolNameContextProps {
  loading: boolean;
  poolNameData: any;
  defaultPoolNameData: any;
  isShow: boolean;

  analysisResult: any;
  fileResultLoading: boolean;
  isCollectionSuccess: boolean;
  isDeleteSuccess: boolean;
  selectOptions: any;
  compositeTreeConditions: any[];
  compositeTreeConditionsData: any[];
  total: string | number;
  pageSize: string | number;
  currentPage: string | number;
  pageSizeOptions: number[];
}

interface TableContextProps {
  selectData: any;
}

interface Props {
  tableContext: TableContextProps;
  poolNameContext: PoolNameContextProps;
  isShow: boolean;
  handleSetPool: (isSetPool: boolean) => void;
  asyncGetPoolNameInit: () => void;
  handleSearchPoolName: (val: string) => void;
  handleFile: (file: any) => void;
  asyncDoCollection: (params: any) => void;
  updateIsCollectionSuccessInTime: (params: boolean) => void;
  asyncDoDelete: (params: any) => void;
  updateDeleteSuccessInTime: (params: boolean) => void;
  asyncAnalysisFile: (params: string) => void;
  asyncGetConditions: () => void;
  asyncGetCompositeTreeConditions: () => void;
  handleChangePagination: (params: any) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .ant-input {
    font-size: 12px;
  }

  .ant-input::placeholder {
    font-size: 12px;
  }
`;

const HeaderConteiner = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const SearchContainer = styled.div`
  margin: 5px 0;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PoolNameConiainer = styled.div`
  flex: 1;
  // overflow-y: auto;
  // overflow-x: hidden;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PoolNameList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const PaginationContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;

const AnalysisHeader = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  align-items: center;

  button {
    font-size: 12px;
    flex-shrink: 0;
  }
`;

const AnalysisBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const AnalysisName = styled.div`
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AnalysisBtn = styled.div`
  margin-top: 5px;
  display: flex;

  & .ant-btn-sm {
    font-size: 12px !important;
  }
`;

const Warning = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: red;
`;

const FileInput = styled.div`
  margin-left: 10px;
`;

const AnalysisContent = styled.div`
  height: 45vh;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  padding: 5px;
`;

const TableContainer = styled.div`
  height: calc(100% - 25px);
  overflow: hidden;

  & .warn-row {
    background: #f0d7dc;
  }

  & .ant-spin-nested-loading,
  & .ant-spin-container,
  & .ant-table-container,
  & .ant-table.ant-table-small {
    height: 100% !important;
  }

  & .ant-table-body {
    height: calc(100% - 30px) !important;
  }

  & .ant-table-placeholder {
    height: 250px;
  }
`;

const LookDiv = styled.div`
  padding-bottom: 10px;
  display: flex;
  align-items: center;

  & div {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const SpanName = styled.span`
  background-color: #1890ff;
  color: #fff;
  border-radius: 3px;
  padding: 3px 5px;
  flex-shrink: 0;
  font-size: 12px;
`;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const SetPoolModal: React.FC<Props> = ({
  tableContext: { selectData },
  poolNameContext: {
    poolNameData,
    defaultPoolNameData,
    loading,
    analysisResult,
    fileResultLoading,
    isCollectionSuccess,
    isDeleteSuccess,
    selectOptions,
    compositeTreeConditions,
    compositeTreeConditionsData,
    total,
    pageSize,
    currentPage,
    pageSizeOptions,
  },
  isShow,
  handleSetPool,
  asyncGetPoolNameInit,
  handleSearchPoolName,
  handleFile,
  asyncDoCollection,
  updateIsCollectionSuccessInTime,
  asyncDoDelete,
  updateDeleteSuccessInTime,
  asyncAnalysisFile,
  asyncGetConditions,
  asyncGetCompositeTreeConditions,
  handleChangePagination,
}) => {
  const fileRef = useRef(null);
  const [isPoolNameVisible, setIsPoolNameVisible] = useState(false);
  const [isPollContentVisible, setIsPollContentVisible] = useState(false);
  const [visibleStatus, setVisibleStatus] = useState<any>(null);
  const [poolName, setPollName] = useState(null);
  const [poolId, setPoolId] = useState(null);
  const [addPoolName, setAddPoolName] = useState(null);
  const [originName, setOriginName] = useState(null);
  const [originAlertPoolId, setOriginAlertPoolId] = useState(null);
  const [searchPoolName, setSearchPoolName] = useState('');

  // 编辑-默认数据
  const [editInitValues, setEditInitValues] = useState({});

  const debounceSelectRef = useRef();

  useEffect(() => {
    asyncGetPoolNameInit();
    asyncGetConditions();
    asyncGetCompositeTreeConditions();
  }, []);

  const modalTitle = useMemo(() => {
    if (isPoolNameVisible) {
      // return visibleStatus === 'add' ? '新建预警池' : '修改预警池';
      return '修改预警池';
    }
    return '';
  }, [isPoolNameVisible]);

  const onSearch = (value: string) => {
    setSearchPoolName(value);
    handleSearchPoolName(value);
  };

  const handleOk = async () => {
    try {
      const { code, msg } =
        visibleStatus === 'add'
          ? await setAlertPoolService.addAlertPool({ alertPoolName: poolName })
          : await setAlertPoolService.updateAlertPool({
              alertPoolName: poolName,
              alertPoolId: originAlertPoolId,
            });
      if (code === 200) {
        message.success(msg);
        await asyncGetPoolNameInit();
        await handleSearchPoolName(searchPoolName);
        setIsPoolNameVisible(false);
        setPollName(null);
        setVisibleStatus(null);
        setOriginName(null);
        setOriginAlertPoolId(null);
        if (visibleStatus === 'add') setAddPoolName(null);
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsPoolNameVisible(false);
    setPollName(null);
    setVisibleStatus(null);
    setOriginName(null);
    setOriginAlertPoolId(null);
  };

  const handleChange = e => {
    setAddPoolName(e.target.value);
  };

  const handleBlur = e => {
    setAddPoolName(e.target.value);
  };

  const handleChangeModal = ({ visible, name, status, originName, alertPoolId }) => {
    const names = name.trim();
    if (!names) return;
    // if (status === 'add' && !names) return;

    // const data = defaultPoolNameData.filter(item => item.alertPoolName === name);
    // if (data.length) {
    //   message.warning('新建预警池已存在,不可重复添加！');
    //   return;
    // }

    setIsPoolNameVisible(visible);
    setVisibleStatus(status);
    setPollName(names);
    if (originName) {
      setOriginName(originName);
      setOriginAlertPoolId(alertPoolId);
    }
  };

  const pollContentModalTitle = useMemo(() => {
    if (isPollContentVisible) {
      return visibleStatus === 'add' ? '新建预警池-' + poolName : '修改预警池-' + poolName;
    }
    return '';
  }, [isPollContentVisible, poolName]);

  const handlePollContentModal = async ({ visible, name, status, alertPoolId }) => {
    const names = name?.trim();
    if (!names) return;
    if (status === 'add') {
      try {
        const { code, data, msg } = await setAlertPoolService.validAlertPoolName({
          alertPoolName: names,
        });
        if (code === 200 && data) {
          setPollName(names);
          setVisibleStatus(status);
          setIsPollContentVisible(visible);
        } else if (code === 200 && !data) {
          message.error('预警池已存在');
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setPollName(names);
      setVisibleStatus(status);
      setIsPollContentVisible(visible);
    }
  };

  const handleOkPollContentModal = () => {};

  const handleCancelPollContentModal = () => {
    setIsPollContentVisible(false);
    setPollName(null);
    setVisibleStatus(null);
    setEditInitValues({});
    setPoolId(null);
  };

  const onFinish = async values => {
    try {
      const { code, data, msg } =
        visibleStatus === 'add'
          ? await setAlertPoolService.addAlertPool({
              alertPoolName: poolName,
              condition: { ...values },
            })
          : await setAlertPoolService.updateAlertPoolCondition({
              alertPoolId: poolId,
              condition: { ...values },
            });
      if (code === 200) {
        message.success(msg);
        await asyncGetPoolNameInit();
        await handleSearchPoolName(searchPoolName);
        setIsPollContentVisible(false);
        setPollName(null);
        setVisibleStatus(null);
        setOriginName(null);
        setOriginAlertPoolId(null);
        setEditInitValues({});
        setPoolId(null);
        if (visibleStatus === 'add') setAddPoolName(null);
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditModal = async obj => {
    try {
      const { code, data, msg } = await setAlertPoolService.getAlertPoolDetail({
        alertPoolId: obj?.alertPoolId,
      });
      if (code === 200) {
        setPoolId(obj.alertPoolId);
        if (data.condition) {
          const arr1 = [];

          data.condition?.compositeTree?.forEach(item => {
            arr1.push(item.value);
          });

          const objs = {
            enterpriseType: data.condition?.enterpriseType || [],
            externalEntityRating: data.condition?.externalEntityRating || [],
            region: data.condition?.region || [],
            str: data.condition?.str || [],
            swFirstIndustry: data.condition?.swFirstIndustry || [],
            tgr: data.condition?.tgr || [],
            wtr: data.condition?.wtr || [],
            compositeTree: arr1,
          };
          setEditInitValues(objs);
        }

        setIsPollContentVisible(true);
        setVisibleStatus('update');
        setPollName(obj.alertPoolName);

        if (debounceSelectRef?.current && debounceSelectRef.current?.defaultOptions) {
          debounceSelectRef.current.defaultOptions(data.condition?.compositeTree || []);
        }
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [isLookVisible, setIsLookVisible] = useState(false);
  const [lookContentObj, setLookContentObj] = useState<any[]>([]);
  const [isLookContent, setIsLookContent] = useState(true);

  const handleLookModal = async obj => {
    try {
      const { code, msg, data } = await setAlertPoolService.getAlertPoolDisplayCondition({
        alertPoolId: obj?.alertPoolId,
      });
      if (code === 200) {
        setPollName(obj.alertPoolName);
        setIsLookVisible(true);
        setLookContentObj([
          { name: '公司类型', content: data.enterpriseType },
          {
            name: '外部评级',
            content: data.externalEntityRating,
          },
          {
            name: '地区',
            content: data.region,
          },
          {
            name: '申万一级行业',
            content: data.swFirstIndustry,
          },
          {
            name: '委托人',
            content: data.wtr,
          },
          {
            name: '受托人',
            content: data.str,
          },
          {
            name: '投管人',
            content: data.tgr,
          },
          ,
          {
            name: '组合名称',
            content: data.compositeTree,
          },
        ]);
        const isShowContent =
          data.enterpriseType ||
          data.externalEntityRating ||
          data.region ||
          data.swFirstIndustry ||
          data.wtr ||
          data.str ||
          data.tgr ||
          data.compositeTree;
        setIsLookContent(isShowContent);
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelLook = () => {
    setPollName(null);
    setIsLookVisible(false);
    setIsLookContent(true);
  };

  const selectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    placeholder: '请查询',
    maxTagCount: 'responsive',
    allowClear: true,
    showSearch: true,
    optionFilterProp: 'label',
  };

  // 组合模糊查询
  const fetSchemaList = async (value: string) => {
    return new Promise(async function(resolve, reject) {
      if (!value) {
        resolve([]);
      } else {
        try {
          const { code, msg, data } = await setAlertPoolService.getCompositeTreeConditions({
            pfName: value,
          });
          if (code === 200) {
            // const datas = (data || []).map(item => item.value);
            // mutations.setState(getState().setIn([key, 'compositeTreeConditions'], fromJS(datas)));

            resolve(data);
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  // 预警池解析
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleChangeAnalysisModal = itemObj => {
    setIsAnalysisVisible(true);
    setAnalysisData(itemObj);
  };

  const fileInputChangeHandler = e => {
    const files = e.target.files;

    if (files && files[0]) {
      // this.file = files[0];
      // console.log(files[0]);
      handleFile(files[0]);
    }
  };

  const handleCancelAnalysis = () => {
    setIsAnalysisVisible(false);
  };

  // 查询
  const handleClickSearch = (id: string) => {
    // window.open(`/abcAnalysis/publicSentiment/set-alert-pool/detail?id=${id}`, '_blank');
    go({ url: `/abcAnalysis/publicSentiment/set-alert-pool?id=${id}` });
  };

  // 收藏
  const [isCollectionVisible, setIsCollectionVisible] = useState(false);
  const [collectionData, setCollectionData] = useState(null);
  const [length, setLength] = useState(0);
  const handleCollection = itemObj => {
    if (selectData && selectData.length) {
      setIsCollectionVisible(true);
      setCollectionData(itemObj);
      setLength(selectData.length);
    } else {
      message.warning('请选择再收藏！');
    }
  };
  const handleOkCollection = () => {
    asyncDoCollection(collectionData.alertPoolId);
  };

  const handleCancelCollection = () => {
    setIsCollectionVisible(false);
    setCollectionData(null);
  };

  // 删除
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const handleClickDelete = itemObj => {
    setIsDeleteVisible(true);
    setDeleteData(itemObj);
  };
  const handleOkDelete = () => {
    asyncDoDelete(deleteData.alertPoolId);
  };
  const handleCancelDelete = () => {
    setIsDeleteVisible(false);
    setDeleteData(null);
  };

  useEffect(() => {
    if (isCollectionSuccess) {
      setIsCollectionVisible(false);
      updateIsCollectionSuccessInTime(false);
    }
    if (isDeleteSuccess) {
      setIsDeleteVisible(false);
      updateDeleteSuccessInTime(false);
    }
  }, [isCollectionSuccess, isDeleteSuccess]);

  // 文件上传
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [analysisTableData, setAnalysisTableData] = useState<any[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const batchColumns = [
    {
      title: '主体名称(导入文件)',
      dataIndex: 'uploadEnterpriseName',
      key: 'uploadEnterpriseName',
      // width: 120,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: (
        <span>
          <span style={{ color: 'red' }}>*</span>主体名称
        </span>
      ),
      dataIndex: 'matchingEnterpriseCode',
      key: 'matchingEnterpriseCode',
      width: 250,
      // ellipsis: true,
      showSorterTooltip: false,
      align: 'center',
      render: (text, record, index) => {
        return (
          !isAnalysisLoading && (
            <Select
              defaultValue={isAnalysisLoading ? '' : text}
              size="small"
              showSearch
              style={{ fontSize: '12px ', width: '90%' }}
              fieldNames={{ label: 'name', value: 'code', options: 'options' }}
              optionLabelProp={'name'}
              optionFilterProp="children"
              filterOption={(input, option) => {
                return (option?.name ?? '').toLowerCase().includes(input.toLowerCase());
              }}
              options={record.matchingEnterprise}
              // options={record.option}
              onChange={v => handleChangeSelect(v, record, index)}
            />
          )
        );
      },
    },
    {
      title: '系统匹配主体名称个数',
      dataIndex: 'matchingCount',
      key: 'matchingCount',
      width: 250,
      align: 'center',
      showSorterTooltip: false,
    },
  ];

  const handleChangeSelect = (val, record, index) => {
    const datas = [...analysisTableData];
    datas[index] = { ...record, matchingEnterpriseCode: val };
    setAnalysisTableData(datas);
  };

  const handleAnalysisOnOk = async () => {
    const selectArr = analysisTableData.filter(item => {
      const arr = selectedRowKeys.filter(items => item.id === items);
      return arr.length ? true : false;
    });
    if (!selectArr?.length) {
      message.warning('请至少选中一条进行操作!');
      return;
    }

    const arr = selectArr.filter(item => item?.matchingEnterpriseCode);
    if (!arr.length) {
      message.warning('主体名称为必填项!');
      return;
    }

    const params = {
      earlyWarnCaseId: analysisData?.alertPoolId,
      matching: selectArr,
    };
    try {
      const { code, msg } = await setAlertPoolService.saveBatchByUpload(params);
      if (code === 200) {
        message.success(msg);
        setIsAnalysisVisible(false);
        setAnalysisTableData([]);
        setSelectedRowKeys([]);
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAnalysisCancel = () => {
    setIsAnalysisVisible(false);
    setAnalysisTableData([]);
    setSelectedRowKeys([]);
    setIsAnalysisLoading(false);
  };

  const uploadProps = {
    name: 'file',
    // action: `${window.location.origin}/yapi/api/abcAnalysis/setAlertPool/import/earlywarnpoolInfo`,
    maxCount: 1,
    accept:
      'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    data: {
      // id: analysisData?.alertPoolId,
    },
    beforeUpload() {
      return false;
    },
    onChange: async function(info) {
      if (!info.fileList?.length) {
        message.error('请上传文件!');
        return;
      }

      // const isLt10M = info.file.size ? info.file.size / 1024 / 1024 < 10 : false;
      // if (!isLt10M) {
      //   message.error('文件不超过10M!');
      //   return;
      // }

      try {
        setIsAnalysisLoading(true);
        setAnalysisTableData([]);
        setSelectedRowKeys([]);
        const params = objTransformFormDada({ file: info.fileList[0]?.originFileObj });
        const { code, data, msg } = await setAlertPoolService.earlywarnpoolInfo(params);

        if (code === 200) {
          setAnalysisTableData(data || []);
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsAnalysisLoading(false);
      }
      // if (info.file.status !== 'uploading') {
      //   // console.log(1111, info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //   // message.success(`${info.file.name} 上传成功.`);
      //   if (info.fileList?.length && info.fileList[0] && info.fileList[0].response) {
      //     const { code, message, data } = info.fileList[0].response;
      //     if (code === 200) {
      //       setAnalysisTableData(data || []);
      //     } else {
      //       message.error(message);
      //     }
      //     setIsAnalysisLoading(false);
      //   }
      //   setIsAnalysisLoading(false);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} 上传失败.`);
      // }
    },
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const rowClassName = (record, index) => {
    return record.matchingCount > 1 ? 'warn-row' : '';
  };

  const downloadTemplate = () => {
    setAlertPoolService.earlywarnpoolTemplate();
  };

  const onChange = async (page: string, pageSize: string) => {
    handleChangePagination && (await handleChangePagination({ page, pageSize }));
  };

  return (
    <FoldModal
      isShow={isShow}
      style={{ background: '#fff', width: '550px', zIndex: 10, overflow: 'hidden' }}
    >
      <Container>
        <HeaderConteiner>
          <Title>预警池设置</Title>
          <CloseOutlined style={{ cursor: 'default' }} onClick={() => handleSetPool(!isShow)} />
        </HeaderConteiner>
        <Divider style={{ margin: '2px 0 5px' }} />
        <SearchContainer>
          <Input.Search
            placeholder="名称搜索"
            allowClear
            onSearch={onSearch}
            size="small"
            style={{ width: '70%', fontSize: '12px' }}
            enterButton
          />
          {/* <Tooltip placement="top" title={'下载模板'} overlayClassName="poll-item-tooltip">
            <DownloadOutlined />
          </Tooltip> */}
        </SearchContainer>

        <PoolNameConiainer>
          {loading ? (
            <EmptyContainer>
              <Spin />
            </EmptyContainer>
          ) : (
            <>
              {poolNameData.length ? (
                <PoolNameList>
                  {poolNameData?.map((item, index) => (
                    <PollItem
                      key={item?.alertPoolId}
                      itemObj={item}
                      handleChangeModal={handleChangeModal}
                      handleChangeAnalysisModal={handleChangeAnalysisModal}
                      handleCollection={handleCollection}
                      handleClickDelete={handleClickDelete}
                      handleClickSearch={handleClickSearch}
                      handleEditModal={handleEditModal}
                      handleLookModal={handleLookModal}
                    />
                  ))}
                </PoolNameList>
              ) : (
                <EmptyContainer>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </EmptyContainer>
              )}
              <PaginationContainer>
                <Pagination
                  total={total}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  pageSizeOptions={pageSizeOptions}
                  onChange={onChange}
                />
              </PaginationContainer>
            </>
          )}
        </PoolNameConiainer>

        <Divider style={{ margin: '2px 0 2px' }} />
        <Footer>
          <Input.Group compact>
            <Input
              allowClear
              size="small"
              style={{ width: 260, height: '25px' }}
              placeholder="预警池名称"
              onChange={handleChange}
              // onBlur={handleBlur}
              maxLength={100}
              value={addPoolName}
            />
            {/* <Button
              size="small"
              style={{ height: '25px', fontSize: '12px' }}
              type="primary"
              onClick={() => handleChangeModal({ visible: true, name: addPoolName, status: 'add' })}
            >
              提交
            </Button> */}
            <Button
              size="small"
              style={{ height: '25px', fontSize: '12px' }}
              type="primary"
              onClick={() =>
                handlePollContentModal({ visible: true, name: addPoolName, status: 'add' })
              }
            >
              新建
            </Button>
          </Input.Group>
        </Footer>
      </Container>
      {/* 新建/修改预警池名称 */}
      <Modal
        title={modalTitle}
        maskClosable={false}
        visible={isPoolNameVisible}
        destroyOnClose={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {visibleStatus === 'add' ? (
          <div style={{ textAlign: 'center' }}>确定要新增【{poolName}】预警池吗?</div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            确定将【{originName}】预警池
            <br />
            修改为【{poolName}】预警池吗？
          </div>
        )}
      </Modal>
      {/* 新增/修改预警池内容 */}
      <Modal
        title={pollContentModalTitle}
        maskClosable={false}
        visible={isPollContentVisible}
        width={'50%'}
        centered={true}
        footer={null}
        bodyStyle={{ fontSize: '12px' }}
        destroyOnClose={true}
        className="poll-content-modal"
        // onOk={handleOkPollContentModal}
        onCancel={handleCancelPollContentModal}
      >
        <Form {...layout} initialValues={editInitValues} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={11}>
              <Form.Item label="公司类型" name="enterpriseType">
                <Select {...selectProps} options={selectOptions.enterpriseType} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="外部评级" name="externalEntityRating">
                <Select {...selectProps} options={selectOptions.externalEntityRating} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <Form.Item label="地区" name="region">
                <Select {...selectProps} options={selectOptions.region} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="申万一级行业" name="swFirstIndustry">
                <Select {...selectProps} options={selectOptions.swFirstIndustry} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <Form.Item label="委托人" name="wtr">
                <Select {...selectProps} options={selectOptions.wtr} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="受托人" name="str">
                <Select {...selectProps} options={selectOptions.str} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <Form.Item label="投管人" name="tgr">
                <Select {...selectProps} options={selectOptions.tgr} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="组合名称" name="compositeTree">
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
                  ref={debounceSelectRef}
                  showSearch
                  allowClear
                  mode="multiple"
                  maxTagCount="responsive"
                  placeholder="请查询"
                  // fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                  optionLabelProp="label"
                  fetchOptions={fetSchemaList}
                  // maxTagCount="responsive"
                  style={{ width: '100%' }}
                /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item noStyle={true}>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                  <Button style={{ marginLeft: '100px' }} onClick={handleCancelPollContentModal}>
                    取消
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* 查看预警池 */}
      <Modal
        title={'查看-' + poolName}
        maskClosable={false}
        visible={isLookVisible}
        // visible={true}
        width={'70%'}
        centered={true}
        footer={null}
        bodyStyle={{ fontSize: '13px', height: '60vh', overflowX: 'hidden', overflowY: 'auto' }}
        destroyOnClose={true}
        className="look-modal"
        // onOk={handleOkPollContentModal}
        onCancel={handleCancelLook}
      >
        {isLookContent &&
          lookContentObj?.map(item => {
            return item.content ? (
              <LookDiv>
                <SpanName>{item.name}</SpanName>
                <span>：</span>
                <Tooltip
                  placement="topLeft"
                  title={item.content}
                  trigger="hover"
                  overlayStyle={{ minWidth: '450px', fontSize: '12px' }}
                  // overlayInnerStyle={{color:'rgba(0, 0, 0, 0.85)'}}
                  // color="#ccc"
                >
                  <div>{item.content}</div>
                </Tooltip>
              </LookDiv>
            ) : (
              ''
            );
          })}
        {!isLookContent && (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </Modal>
      {/* 预警池解析 */}
      {/* <Modal
        title={'预警池解析'}
        maskClosable={false}
        visible={isAnalysisVisible}
        footer={null}
        width={'80%'}
        onCancel={handleCancelAnalysis}
      >
        <AnalysisHeader>
          <AnalysisBox>
            <AnalysisName>预警池名称：{analysisData?.alertPoolName}</AnalysisName>
            <FileInput>
              <input
                type="file"
                ref={fileRef}
                onChange={fileInputChangeHandler}
                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
            </FileInput>
          </AnalysisBox>
          <Button type="primary" size="small" onClick={() => asyncAnalysisFile(analysisData?.id)}>
            解析
          </Button>
        </AnalysisHeader>
        <Divider style={{ margin: '8px 0 5px', backgroundColor: 'rgb(245,247,250)' }} />
        <div>
          <div style={{ fontSize: '12px' }}>解析结果</div>
          <AnalysisContent>
            {fileResultLoading ? (
              <EmptyContainer>
                <Spin />
              </EmptyContainer>
            ) : (
              <>
                {analysisResult?.map(item => (
                  <div>{item}</div>
                ))}
              </>
            )}
          </AnalysisContent>
        </div>
      </Modal> */}
      {/* 批量导入 */}
      <Modal
        title={'导入待查询主体'}
        maskClosable={false}
        visible={isAnalysisVisible}
        // footer={null}
        width={'80%'}
        centered={true}
        bodyStyle={{ paddingTop: 5, paddingBottom: 5 }}
        destroyOnClose={true}
        onOk={handleAnalysisOnOk}
        onCancel={handleAnalysisCancel}
      >
        <AnalysisHeader>
          <AnalysisBox>
            <AnalysisName>预警池名称：{analysisData?.alertPoolName}</AnalysisName>
          </AnalysisBox>
        </AnalysisHeader>
        <AnalysisBtn>
          <Button
            size="small"
            type="primary"
            icon={<DownloadOutlined />}
            style={{
              background: 'rgb(86, 194, 45)',
              borderColor: 'rgb(86, 194, 45)',
              marginRight: '10px',
            }}
            onClick={downloadTemplate}
          >
            下载模板
          </Button>

          <Upload {...uploadProps} showUploadList={false}>
            <Button size="small" type="primary" icon={<UploadOutlined />}>
              上传文件
            </Button>
          </Upload>
        </AnalysisBtn>
        {/* <Warning>只能上传xlsx文件，且不超过10M</Warning> */}
        <Warning>只能上传xlsx文件，且单次上传不能超过50条数据</Warning>
        <Divider style={{ margin: '8px 0 5px', backgroundColor: 'rgb(245,247,250)' }} />
        <div style={{ height: '350px', overflow: 'hidden' }}>
          <div style={{ fontSize: '12px' }}>
            共导入{analysisTableData.length}个主体，已选中{selectedRowKeys?.length || 0}个主体
          </div>
          <TableContainer>
            <TableComponent
              columns={batchColumns}
              dataSource={analysisTableData}
              rowSelection={{ ...rowSelection }}
              pagination={false}
              scroll={{ x: '100%', y: 'calc(100% - 40px)' }}
              size="small"
              loading={isAnalysisLoading}
              rowKey={(record: any) => record.id}
              rowClassName={rowClassName}
            />
          </TableContainer>

          {/* </AnalysisContent> */}
        </div>
      </Modal>
      {/* 收藏 */}
      <Modal
        title={'预警池信息收藏'}
        maskClosable={false}
        destroyOnClose={true}
        visible={isCollectionVisible}
        onOk={handleOkCollection}
        onCancel={handleCancelCollection}
      >
        <div style={{ textAlign: 'center' }}>
          您确定要把预警池管理界面所选的【{length}】条数据收藏到【{collectionData?.alertPoolName}
          】中吗？
        </div>
      </Modal>
      {/* 删除 */}
      <Modal
        title={'删除'}
        maskClosable={false}
        visible={isDeleteVisible}
        destroyOnClose={true}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <div style={{ textAlign: 'center' }}>
          您确定要删除【{deleteData?.alertPoolName}】预警池吗？
        </div>
      </Modal>
    </FoldModal>
  );
};

export default getHocComp(SetPoolModal);
