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

  & .ant-form-item {
    margin-bottom: 10px;
  }

  & .ant-form-item-label>label {
    font-size: 12px;
  }

  & .ant-select {
    font-size: 12px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-grop:1;
  height: calc(100vh - 220px);
  padding-top: 10px;
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