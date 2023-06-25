import styled from 'styled-components';

export const TableContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const TablesForm = styled.div`
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-right: 5px;

  & .ant-tabs {
    flex: 1;
    overflow: hidden;
  }

  & .ant-tabs-content {
    height: 100%;
    overflow-y: hidden;
  }
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const FormContainer = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const FormContent = styled.div`
  flex: 1;
  border: 1px solid #eef1f6;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  & .ant-input-number {
    font-size: 12px;
    width: 55px;
  }
`;

export const FormHead = styled.div`
  background: #eef1f6;
  height: 30px;
  display: flex;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }
`;

export const HeadItem1 = styled.div`
  flex: 1;
  border-right: 1px solid rgb(245, 247, 250);
`;

export const HeadItem2 = styled.div`
  flex: 3;
`;

export const FormItemRow = styled.div<{ isChange?: any }>`
  display: flex;
  max-height: 32px;

  &:nth-child(2n + 1) {
    background: ${({ isChange }) => (isChange ? '#f0d7dc' : '#fff')};
  }

  &:nth-child(2n) {
    background: ${({ isChange }) => (isChange ? '#f0d7dc' : '#e8f0f7')};
    // background: rgb(245, 247, 250);
  }

  & .ant-form-item-control-input-content {
    font-size: 12px;
  }

  & .ant-form-item {
    margin-bottom: 0;
  }

  & .ant-form-item:nth-child(1) {
    flex: 1;
    // text-align: center;
    border-right: 1px solid rgb(245, 247, 250);

    & .ant-form-item-control-input {
      padding-left: 20px;
    }
  }

  & .ant-form-item:nth-child(2) {
    flex: 3;

    & .ant-form-item-control-input {
      padding-left: 20px;
    }
  }

  & .ant-select {
    font-size: 12px;
    width: 100px;
    display: inline-block;
  }

  & .ant-input {
    width: 30%;
    font-size: 12px;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding-top: 10px;
  padding-bottom: 10px;

  & button {
    cursor: default;
  }

  & button:last-child {
    margin-left: 200px;
  }
`;

export const FormGroup = styled.div`
  & .ant-input-number {
    font-size: 12px;
    width: 100px;
  }
`;

export const FormGroupTitle = styled.div`
  display: flex;
  padding: 5px 15px;
  font-size: 12px;
  font-weight: 500;
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & > div {
    flex-shrink: 0;
    // font-size: 12px;
  }

  & .ant-input {
    width: 70%;
    margin-left: 10px;
    font-size: 12px;
  }

  & .ant-form {
    width: 100%;
  }
`;

export const ModalText = styled.div`
  text-align: center;
`;
export const ModalTextLeft = styled.div`
  text-align: left;
`;

export const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Back = styled.div`
  padding-right: 15px;
  color: #1890ff;
  cursor: pointer;
  font-weight: normal;
  font-size: 13px;
`;
