import styled from "styled-components";

export const a = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  font-size: 12px !important;

  & .ant-form-item {
    margin-right: 25px;
    font-size: 12px !important;
  }

  & .ant-form-item-label > label, & .ant-btn-sm, & .ant-picker-input > input, & .ant-select, .ant-btn {
    font-size: 12px !important;
  }
`;


