import React, { useEffect } from 'react';
import {Table} from 'antd';

import './index.css';

// interface Props {
//   dataSource:object[];
//   columns: any;
//   rowSelection?: any;
//   scroll?: any;
//   size?:any;
//   pagination?:any;
//   loading?:boolean;
// }

const TableComponent: React.FC = (props) => {
  return (
    <Table className="table" {...props}/>
  )
}

export default TableComponent;