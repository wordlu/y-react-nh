import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Tabs } from 'antd';
import { DoubleRightOutlined, DownloadOutlined } from '@ant-design/icons';
import { Loading } from '@lugia/lugia-web';
import moment from 'moment';

import FoldModal from '@/components/fold-modal';
import BarChart1 from '../child-chart1';
import ChildTable from '../child-table';
import { getHocComp } from '@/utils';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import { Container, TabContainer, LoadingContainer } from './style';

const EarlyWarningSubjectsModal: React.FC = ({
  selectExcelParams,
  formData,
  childTableLoading,
  isShowModal,
  tags,
  childData,
  updateIsShowModalInTime,
  childLoading,
  currentTag,
  childTotal,
  currentRow,
  childPageNo,
  childPageSize,
  pageSizeOptions,
  updateCurrentTag,
  asyncHandleCurrentSaerch,
  handleChildChange,
  asyncExportFile,
}) => {
  const chartRef = useRef();

  const handleDownLoad = () => {
    if (chartRef?.current && chartRef.current.saveImage) {
      chartRef.current.saveImage();
    } else {
      downLoadCurrentFile(null);
    }
  };
  const slot = useMemo(
    () => ({
      left: (
        <DoubleRightOutlined
          style={{ color: '#ccc' }}
          onClick={() => {
            updateIsShowModalInTime(false);
          }}
        />
      ),
      right: (
        <div onClick={handleDownLoad}>
          {/* <DownloadOutlined style={{ color: '#9ba3ab' }} /> */}
          <DownloadOutlined />
        </div>
      ),
    }),
    [currentTag, childData.tableData]
  );

  const handleChangeTab = async activeKey => {
    // console.log(99999, activeKey);
    updateCurrentTag && (await updateCurrentTag(activeKey));
    asyncHandleCurrentSaerch &&
      asyncHandleCurrentSaerch(activeKey == '3' || activeKey == '4' ? false : true);
  };

  // const downLoadCurrentFile = url => {
  //   let file = null;
  //   if (url) {
  //     file = base64toFile(url);
  //   }
  //   console.log(1111,file)
  //   asyncExportFile(file);
  //   // downloadFile(params,'/api/EarlyWarnDetailsController/exportFile',true)
  // };

  const downLoadCurrentFile = url => {
    let file = null;
    if (url) {
      file = base64toFile(url);
    }

    // const params = {
    //   data: JSON.stringify({
    //     subjectId: currentRow.id,
    //     requireChart: false,
    //     tabType: currentTag,
    //     pageNo: childPageNo,
    //     pageSize: childPageSize,
    //   }),
    // };

    const params = {
      data: JSON.stringify(childData.tableData),
      tabType: currentTag,
      earlyWarnPool: selectExcelParams.earlyWarnPoolLabel,
      earlyWarnPlan: selectExcelParams.earlyWarnPlanLabel,
      searchDate: moment(formData.searchDate).format('YYYYMMDD') || '',
    };

    if (file) params.file = file;
    // console.log(66666, params, currentTag);
    const data = objTransformFormDada(params);
    // console.log(data);
    asyncExportFile(data);
    // downloadFile(params,'/api/EarlyWarnDetailsController/exportFile',true)
  };

  return (
    <FoldModal
      isShow={isShowModal}
      // isShow={true}
      style={{
        width: '45%',
        height: '100%',
        background: '#fff',
        zIndex: 10,
        padding: 0,
        top: '5px',
      }}
    >
      <Container>
        <Tabs
          activeKey={currentTag}
          tabBarExtraContent={slot}
          onChange={handleChangeTab}
          destroyInactiveTabPane={true}
        >
          {tags.map((item, index) => (
            <Tabs.TabPane tab={item.name} key={item.id}>
              <TabContainer>
                {childLoading ? (
                  <LoadingContainer>
                    <Loading />
                  </LoadingContainer>
                ) : (
                  <>
                    {(index === 0 || index === 1) && (
                      <BarChart1
                        chartData={childData.chart}
                        index={index}
                        ref={chartRef}
                        getUrl={url => downLoadCurrentFile(url)}
                      />
                    )}
                    <ChildTable
                      childTableLoading={childTableLoading}
                      tableData={childData.tableData}
                      index={index}
                      pagination={{
                        total: childTotal,
                        pageNo: childPageNo,
                        pageSize: childPageSize,
                        pageSizeOptions: pageSizeOptions,
                      }}
                      handleChildChange={handleChildChange}
                      asyncHandleCurrentSaerch={asyncHandleCurrentSaerch}
                    />
                  </>
                )}
              </TabContainer>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Container>
    </FoldModal>
  );
};

export default getHocComp(EarlyWarningSubjectsModal);
