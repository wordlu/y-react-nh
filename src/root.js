import React from 'react';
import { createApp, createRoute } from '@lugia/lugiax-router';
import { history } from '@utils/cusRouter';
import Permission from '@ysstech-data/data-web/dist/permissions-hoc/class';

import Main from './App';

const router = {
  '/': {
    component: Main,
    verify({ url }) {
      return true;
    },
  },
};

const App = createApp(
  {
    '/': {
      component: () => {
        return <React.Fragment>{createRoute(router)}</React.Fragment>;
      },
      verify({ url }) {
        return true;
      },
    },
  },
  history,
  {}
);

const permissionHandler = e => {
  const permission = Permission.getInstance();
  const {
    detail: { permissions },
  } = e;
  permission.setPermissions(permissions);
};

export default class Root extends React.Component {
  componentDidMount() {
    // globalStore.mutations.setEventDistributor(this.props.globalEventDistributor);
    document.addEventListener('permissions', permissionHandler);
  }
  componentWillUnmount() {
    document.removeEventListener('permissions', permissionHandler);
  }
  render() {
    return <App />;
  }
}
