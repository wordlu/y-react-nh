import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .ant-input {
    font-size: 12px;
  }

  .ant-input::placeholder {
    font-size: 12px;
  }
`;

export const HeaderConteiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const FormContainer = styled.div`
  .ant-picker-small {
    width: 100%;
  }

  .ant-picker-input > input {
    font-size: 12px;
    height: 22px;
  }

  .ant-form-item-control-input-content {
    text-align: right;
  }
`;

export const TableContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const PaginationContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;
