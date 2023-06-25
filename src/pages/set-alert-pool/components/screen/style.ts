import styled from "styled-components";

export const Container = styled.div`
height:100%;
display: flex;
flex-direction: column;
`;

export const ShowTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 2px;
  background: rgb(245,247,250);
  margin-top: 5px;
  align-items: center;
`;

export const ResetBtn = styled.div`
  color: #1890ff;
  font-size: 14px;
  padding-right: 3px;
  cursor: default;
`;

export const Title = styled.div`
  width: 100%;
  height: 30px;
  text-align: center;
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
`;

export const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
