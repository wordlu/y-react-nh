import styled from "styled-components";


export const Modal = styled.div<{isShow:boolean}>`
position: absolute;
right: ${({isShow})=>(isShow? 0:'-100%')};
top:0;
transition: 0.5s;
height: 100%;
padding: 10px 10px 0;
border: 1px solid #f0f2f5;
box-shadow: 0px 0px 6px #e6ebf2;
z-index: 100;
`
