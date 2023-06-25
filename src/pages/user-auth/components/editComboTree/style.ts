import styled from 'styled-components';


export const Container  = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const NavTitle = styled.div`
  display: flex;
  width: 100%;
  // border-bottom: 1px solid #d9d9d9;

  & .ant-form-item {
    margin-bottom: 10px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-grop:1;
  width: 100%;

`

export const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  
`
export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`