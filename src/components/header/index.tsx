import React from 'react';
import { go } from '@utils/cusRouter';
import { consts as Widget, Icon, Navmenu } from '@lugia/lugia-web';
import { HeaderContainer, Title, Navdiv } from './style';
import RoutingConfig from '@/config/router/cusRouting.config';

const navTheme = {
  [Widget.NavMenu]: {
    Tabs: {
      Container: {
        normal: {
          background: {
            color: 'inherit',
          },
        },
      },
      TabHeader: {
        DefaultTabPan: {
          normal: {
            color: '#ffffff',
            background: {
              color: 'inherit',
            },
            height: 57,
          },

          hover: {
            color: '#0099ff',
            font: {
              size: '',
              weight: 900,
            },
          },
        },
        SelectTabPan: {
          normal: {
            font: {
              size: '',
              weight: 900,
            },
            color: '#0099ff',
          },
        },
      },
      BorderStyle: {
        normal: {
          background: {
            color: 'inherit',
          },
        },
      },
    },
  },
};

/* 把需要在页面上显示的导航筛选出来 */
const routerFilter = data => {
  return data.filter((item, index) => {
    if (item.children && item.children.length > 0) {
      data[index].children = routerFilter(item.children);
    }
    return item.isShowMenu;
  });
};

/* children 改成 child */
const routerMap = data => {
  return data.map((item, index) => {
    const newItem = {
      value: item.value,
      text: item.text,
      id: item.id,
      child: item.children,
    };
    return newItem;
  });
};

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      value: '',
      menuData: [],
      height: '',
      width: '',
    };
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  componentDidMount() {
    const viewHeight = this.getWindowHeight(),
      viewWidth = this.getWindowWidth();
    let menuData = RoutingConfig;
    this.setState({
      height: viewHeight,
      width: viewWidth,
      menuData: menuData,
    });

    window.onresize = () => {
      const viewHeight = this.getWindowHeight(),
        viewWidth = this.getWindowWidth();
      this.setState({
        height: viewHeight,
        width: viewWidth,
      });
    };
  }

  getWindowHeight = () => {
    return document.body.clientHeight - 122;
  };

  getWindowWidth = () => {
    return document.body.clientWidth - 84;
  };

  onSelect = ({ value }) => {
    go({ url: value });
  };

  render() {
    const { projectName = '' } = this.props;

    return (
      <HeaderContainer>
        <Title>
          <Icon iconClass="lugia-icon-logo_ysstech" />
          <span>赢时胜中台赋能中心{projectName && `/${projectName}`}</span>
        </Title>
        {this.state.menuData.length !== 0 && (
          <Navdiv>
            <Navmenu
              theme={navTheme}
              pathSeparator={'@'}
              action={'hover'}
              onSelect={this.onSelect}
              mode={'horizontal'}
              inlineType={'primary'}
              data={this.state.menuData}
              autoHeight={true}
              inlineExpandAll={true}
            />
          </Navdiv>
        )}
      </HeaderContainer>
    );
  }
}
