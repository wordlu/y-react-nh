import { DataItem } from '.';
export default <DataItem[]>[
  {
    name: 'test',
    type: 'data',
    useBaseURL: true,
    value: {
      url: '/test',
      method: 'GET',
    },
    target: 'TestDataImpl',
    path: 'TestData/TestDataImpl',
  },
];
