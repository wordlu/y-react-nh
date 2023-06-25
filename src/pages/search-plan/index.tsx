import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider, message, Empty, Tabs } from 'antd';
import React, { useMemo, useState, useEffect } from 'react';
import { Loading } from '@lugia/lugia-web';

import SearchTree from './components/index';
import { financingRepurchaseService } from '@/config/di.config';
import { SMARTBI_URL } from './constant';
import { addQueryString } from '@/utils/helper';

import './style.css';

const App: React.FC = () => {
  const [menuId, setMenuId] = useState('');
  const [menuName, setMenuName] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [iframeContent, setIframeContent] = useState('');
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState({
    resid: '', // 模板id
    user: '', // smartbiUser
    password: '', // smartbiPassword
    'param.RISKUSER': '', // userId
    'param.PF_ID': '', // 组合id
    showtoolbar: true,
    showWorkspace: false,
    showResource: false,
    fieldsConfig: '',
    // pfId: '', // 组合id
    // pfName: '', // 组合name
  });
  const [tabContent, setTabContent] = useState<any[]>([]);
  const [tabActive, setTabActive] = useState<any>(null);

  const getSelectId = async (type, value, name) => {
    if (type === 'menu') {
      setMenuId(value);
      setMenuName(name);
    }

    if (type === 'role' && value && menuId) {
      const isFilterIndex = tabContent.findIndex(item => item.tab === menuName + '-' + name);
      if (isFilterIndex === -1 && tabContent.length === 20) {
        message.warning('最多可选20个模板');
        return;
      }
      setTabActive(menuId + '-' + value);
      const arr =
        isFilterIndex === -1
          ? [...tabContent, { tab: menuName + '-' + name, key: menuId + '-' + value }]
          : tabContent;
      // setTabContent(arr);

      isFilterIndex === -1 && getSmartbi(value, arr);
    } else if (type === 'role' && menuId && !value) {
      message.error('请求参数缺失.请选择正确模板.');
    } else if ((type === 'menu' && templateId && !value) || (type === 'role' && value && !menuId)) {
      message.error('请求参数缺失.请选择正确组合.');
    }
  };

  const getSmartbi = async (value, tabData) => {
    try {
      const { code, msg, data } = await financingRepurchaseService.sendSmartbi({
        pfId: menuId,
        id: value,
      });

      if (code === 200) {
        let obj = { ...query };
        if (typeof data === 'object') {
          obj = { ...obj, ...data };
        }
        const queryStr = addQueryString(obj);

        const arr = tabData.map(item => {
          if (item.key === menuId + '-' + value) return { ...item, url: SMARTBI_URL + queryStr };
          return item;
        });
        setTabContent(arr);

        setTemplateId(value);
      } else {
        // setTabContent(tabData);

        message.error(msg);
      }
    } catch (err) {
      // setTabContent(tabData);
      console.log(err);
    }
  };

  const handleChangeTab = key => {
    setTabActive(key);
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    const arr = tabContent.filter(item => item.key !== targetKey);

    setTabContent(arr);
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <div className="search-plan-container">
        <div className="search-plan-planBody">
          <div className="search-plan-left">
            <SearchTree type="menu" getSelectId={getSelectId} />
            <SearchTree type="role" getSelectId={getSelectId} />
          </div>
          <div className="search-plan-right">
            <Tabs
              activeKey={tabActive}
              style={{ flex: 1, overflow: 'hidden' }}
              size="small"
              type="editable-card"
              hideAdd
              destroyInactiveTabPane={false}
              onChange={handleChangeTab}
              onEdit={onEdit}
            >
              {tabContent.map((item, index) => (
                <Tabs.TabPane
                  style={{ overflowY: 'auto', overflowX: 'hidden' }}
                  tab={item.tab}
                  key={item.key}
                >
                  {item.url && (
                    <iframe
                      id={item.key}
                      src={item.url}
                      width="100%"
                      height="100%"
                      scrolling="auto"
                      style={{ padding: '0 10px' }}
                      frameborder="0"
                    ></iframe>
                  )}
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
