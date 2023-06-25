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
  const [tabActive, setTabActive] = useState(null);

  const ref = React.useRef(null);

  const getSelectId = async (type, value, name) => {
    if (type === 'menu') {
      setMenuId(value);
    }

    // if (type === 'role' && value && menuId && value !== templateId) {
    if (type === 'role' && value && menuId) {
      // setIsLoading(true);
      // setIframeContent('');
      // try {
      //   const { code, msg, data } = await financingRepurchaseService.sendSmartbi(
      //     {
      //       pfId: menuId,
      //       id: value,
      //     }
      //     // {
      //     //   id: 'I402888e4016c5fad5fad4487016c60abbf9d0a29',
      //     //   pfId: '1020310004',
      //     // }
      //   );
      //   if (code === 200) {
      //     await setIframeContent(data || '');
      //     setIframeHTML(data || '');
      //   } else {
      //     message.error(msg);
      //   }
      // } catch (err) {
      //   console.log(err);
      // } finally {
      //   setIsLoading(false);
      // }

      // const isFilterIndex = tabContent.findIndex(item => item.key === value);
      // setTabActive(value);
      // if (isFilterIndex === -1) setTabContent([...tabContent, { tab: name, key: value }]);

      setUrl('');
      getSmartbi(value);
    } else if (type === 'role' && menuId && !value) {
      message.error('请求参数缺失.请选择正确模板.');
    } else if ((type === 'menu' && templateId && !value) || (type === 'role' && value && !menuId)) {
      message.error('请求参数缺失.请选择正确组合.');
    }
    // else if (type === 'role' && value && menuId && value === templateId) {
    //   return;
    // }
  };

  const getSmartbi = async value => {
    try {
      const { code, msg, data } = await financingRepurchaseService.sendSmartbi({
        pfId: menuId,
        id: value,
      });

      if (code === 200) {
        // const datas = {
        //   resid: 'I402888e4016c5fad5fad4487016c658c3dc212cf', // 模板id
        //   user: 'admin', // smartbiUser
        //   password: '111111', // smartbiPassword
        //   'param.RISKUSER': '19042210182560921763', // userId
        //   'param.PF_ID': '1020310004', // 组合id
        // };
        let obj = { ...query };
        if (typeof data === 'object') {
          obj = { ...obj, ...data };
        }
        const queryStr = addQueryString(obj);
        setUrl(SMARTBI_URL + queryStr);
        setTemplateId(value);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setIframeHTML = data => {
    const iframe: HTMLIFrameElement | null = ref.current;
    if (iframe && iframe.contentWindow) {
      const iframeDocument = iframe.contentWindow.document;
      // 写入内容（这里举例的 iframe 内容是请求接口后返回 html，也就是 res，比如 res="<h1>标题</h1>"）
      iframeDocument.write(data);

      iframe.write(data);
    }
  };

  const init = () => {
    const frm = document.forms['test_form'];
    const resid = document.getElementById('resid');
    resid.value = 'I402888e4016c5fad5fad4487016c658c3dc212cf';
    // document.test_form.action = 'http://219.141.235.67:16001/smartbi/vision/';
    // document.test_form.action = SMARTBI_URL;
    document.test_form.action =
      '/smartbi/vision/openresource.jsp?resid=I402888e4016c5fad5fad4487016c658c3dc212cf&showtoolbar=true&user=admin&password=111111';
    const user = document.getElementById('user');
    user.value = 'admin';
    const password = document.getElementById('password');
    password.value = '111111';
    // const currUser = document.getElementById('param.RISKUSER');
    // currUser.value = '19042210182560921763';
    const ifm = document.getElementById('test_iframe');
    //动态创建inpu框

    // if (codeName != null && codeName != 'null' && codeName != '') {
    // var input = document.createElement('input'); //创建input节点
    // input.type = 'hidden'; //定义类型
    // input.id = 'param.YLJ_PFNAME';
    // input.name = 'param.YLJ_PFNAME';
    // input.value = '1020310004';
    // frm.appendChild(input); //添加到form
    // }
    // console.log(frm);
    //Ext.getCmp("test_form").submit();
    // frm.submit();
    ifm.onload = function() {
      ifm.onload = null;
    };
    return true;
  };

  useEffect(() => {
    // (()=>{
    //   try{
    //     const {code,msg,data} = financingRepurchaseService.sendSmartbiDataResult(
    //       {
    //       pfId: menuId,
    //       id: value,
    //       }
    //       // {
    //       //   id: 'I402888e4016c5fad5fad4487016c60abbf9d0a29',
    //       //   pfId: '1020310004',
    //       // },
    //     );
    //     console.log(1111,data);
    //   }catch(err){
    //     console.log(err);
    //   }
    //   })()
    // init();
    // setUrl(
    //   SMARTBI_URL +
    //     'resid=I402888e4016c5fad5fad4487016c658c3dc212cf&showtoolbar=true&user=admin&password=111111&param.RISKUSER=19042210182560921763&param.YLJ_PFNAME=1020310004&showWorkspace=false&showResource=false&fieldsConfig'
    // );
  }, []);

  // const init = () => {
  //   const frm = document.forms['test_form'];
  //   const resid = document.getElementById('resid');
  //   resid.value = id;
  //   document.test_form.action = '' + smartbiAddress + '/vision/openresource.jsp';
  //   const user = document.getElementById('user');
  //   user.value = smartbiUser;
  //   const password = document.getElementById('password');
  //   password.value = smartbiPassword;
  //   const currUser = document.getElementById('param.RISKUSER');
  //   currUser.value = userId;
  //   const ifm = document.getElementById('test_iframe');
  //   //动态创建inpu框
  //   console.log(codeName);
  //   if (codeName != null && codeName != 'null' && codeName != '') {
  //     var input = document.createElement('input'); //创建input节点
  //     input.type = 'hidden'; //定义类型
  //     input.id = codeName;
  //     input.name = codeName;
  //     input.value = pfId;
  //     frm.appendChild(input); //添加到form
  //   }
  //   console.log(frm);
  //   //Ext.getCmp("test_form").submit();
  // frm.submit();
  //   ifm.onload = function() {
  //     ifm.onload = null;
  //   };
  //   return true;
  // };

  const handleChangeTab = key => {
    // console.log(111, key);
    setTabActive(key);
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <div className="search-plan-container">
        {/* <div className="search-plan-title">报告查询</div> */}
        <div className="search-plan-planBody">
          <div className="search-plan-left">
            <SearchTree type="menu" getSelectId={getSelectId} />
            <SearchTree type="role" getSelectId={getSelectId} />
          </div>
          <div className="search-plan-right">
            {url && (
              <iframe
                src={url}
                // src={"/smartbi/vision/openresource.jsp?resid=I402888e4016c5fad5fad4487016c658c3dc212cf&showtoolbar=true&user=admin&password=111111"}
                width="100%"
                height="100%"
                scrolling="auto"
                style={{ padding: '10px' }}
                frameborder="0"
              ></iframe>
            )}
            {/* <Tabs
              activeKey={tabActive}
              style={{ flex: 1, overflow: 'hidden' }}
              size="small"
              destroyInactiveTabPane={false}
              onChange={handleChangeTab}
            >
              {tabContent.map(item => (
                <Tabs.TabPane
                  style={{ overflowY: 'auto', overflowX: 'hidden' }}
                  tab={item.tab}
                  key={item.key}
                >
                  {item.tab}
                  {url && (
                    <iframe
                      // id="test_iframe"
                      // name="test_iframe"
                      id={item.key}
                      src={url}
                      // src={"/smartbi/vision/openresource.jsp?resid=I402888e4016c5fad5fad4487016c658c3dc212cf&showtoolbar=true&user=admin&password=111111"}
                      width="100%"
                      height="100%"
                      scrolling="auto"
                      style={{ padding: '10px' }}
                      frameborder="0"
                    ></iframe>
                  )}
                </Tabs.TabPane>
              ))}
            </Tabs> */}
          </div>
          {/* <div className="right">
            <form
              id="test_form"
              name="test_form"
              method="get"
              target="test_iframe"
              action="http://192.168.1.26:18080/smartbi/vision/openresource.jsp"
            >
              <input type="hidden" id="resid" name="resid" value="" />
              <input type="hidden" id="param.RISKUSER" name="param.RISKUSER" value="" />
      
              <input type="hidden" id="showtoolbar" name="showtoolbar" value="true" />
              <input type="hidden" id="showWorkspace" name="showWorkspace" value="false" />
              <input type="hidden" id="showResource" name="showResource" value="false" />
              <input type="hidden" id="fieldsConfig" name="fieldsConfig" value=""/>
              <input type="hidden" id="user" name="user" value="admin" />
              <input type="hidden" id="password" name="password" value="111111" />
            </form>
           
            <Loading loading={isLoading} isInherit={true}>
              {iframeContent ? (
                <iframe
                  ref={ref}
                  width="100%"
                  height="100%"
                  style={{ padding: '10px' }}
                  frameborder="0"
                  scrolling="auto"
                ></iframe>
              ) : (
                <div className="search-plan-empty">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </Loading>
          </div> */}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
