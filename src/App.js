import React from 'react';
import { createRoute, Redirect } from '@lugia/lugiax-router';
import routingConfig from './config/router/cusRouting.config';
import './App.css';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
// import 'reflect-metadata';
import styled from 'styled-components';

const NODE_ENV = process.env.NODE_ENV;

const getRouters = (routingConfig, routes) => {
  const rout = routes || {};
  routingConfig.forEach(item => {
    const { component, value, render } = item;
    if (component) {
      rout[value] = {
        exact: true,
        verify({ url }) {
          return true;
        },
        component,
      };
    } else if (render) {
      rout[value] = {
        exact: true,
        verify({ url }) {
          return true;
        },
        render,
      };
    } else {
      const { children } = item;
      rout[value] = {
        exact: true,
        render: async () => {
          return () => (
            <Redirect
              to={{
                pathname: getIndexRouter(children),
              }}
            />
          );
        },
      };

      if (children) {
        return getRouters(children, rout);
      }
    }
  });
  return rout;
};

function getIndexRouter(routingConfig) {
  if (!routingConfig || routingConfig.length === 0) {
    return '/404';
  }
  return routingConfig[0].value;
}

export const firstRouter = {
  ...getRouters(routingConfig),
  '/': {
    exact: true,
    // render: async () => import('@/pages/test-demo'),
    // component: () => <Redirect to={{ pathname: '/abcAnalysis/publicSentiment/set-alert-pool' }} />,
    render: async () => import('@/pages/home'),
  },
  // NotFound: { component: () => <Redirect to={{ pathname: '/404' }} /> },
};

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  width: 100%;
`;
const LugiadBox = styled.div`
  background: rgb(245, 247, 250);
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const AbsoluteBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;
`;
const AbsoluteWidgetBox = styled.div`
  z-index: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  left: 0%;
  top: 0.0925926%;
  flex-direction: column;
`;
const BreadcrumbsContainer = styled.div`
  padding: 5px 10px 0;
`;
const RouterComponentContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

export default () => {
  const AppContext = React.createContext({});

  return (
    <React.Fragment>
      {NODE_ENV === 'development' && <Header projectName=""></Header>}
      <Wrapper>
        <LugiadBox className="lugiad_pageBox">
          <AbsoluteBox>
            <AbsoluteWidgetBox>
              {/* <BreadcrumbsContainer>
                <Breadcrumbs />
              </BreadcrumbsContainer> */}
              <RouterComponentContainer>{createRoute(firstRouter)}</RouterComponentContainer>
            </AbsoluteWidgetBox>
          </AbsoluteBox>
        </LugiadBox>
      </Wrapper>
    </React.Fragment>
  );
};
