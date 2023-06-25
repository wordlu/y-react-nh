import { Select, Spin, Divider, Pagination } from 'antd';
// import type { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

import './style.css'

type PaginationType = {
  // 总条数
  totalElements: number;
  // 总页数
  totalPages?: number;
  // 每页大小
  pageSize?: number;
};


const DebounceSelect = forwardRef(({ 
  pagination,
  request,
  width = '100%',
  fetchOptions, 
  debounceTimeout = 1000, 
  ...props
}, ref) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [val, setVal] = useState<string>('');
  const fetchRef = useRef(0);

  const [current, setCurrent] = React.useState<number>(1);
  const [totalPages] = React.useState<number>(Math.ceil(pagination?.totalElements / 10));

  useImperativeHandle(ref, () => ({
    defaultOptions,
  }));

  useEffect(() => {
    // useEffect 执行两次问题
    const timeout = setTimeout(() => debounceFetcher(''), 400);
    return () => clearTimeout(timeout);
  }, []);

  const defaultOptions = (options?: any) => {
    setOptions(options || []);
  };

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string, page: number) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      const currentPage = page ? page : 1
      setCurrent(currentPage);
      fetchOptions(value, currentPage).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        setVal(value);

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);


  const pageOnChange = async (page: string, pageSize: string) => {
    debounceFetcher(val, page);
  };

  return (
    <div>
       {pagination ? (
          <Select
            filterOption={false}
            dropdownClassName="select-page-dropdown"
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
            dropdownRender={menu => (
              <>
                {menu}
                {totalPages >= 1 && <Divider style={{ margin: '8px 0' }} />}
                <div style={{ padding: '0 8px 4px 4px', display: 'flex', justifyContent: 'flex-end', alignItems:'center', fontSize: '12px',flexWrap: 'nowrap' }}>
                  {(width >= 240 || width === '100%') && totalPages >= 1 && (
                    <span>共 {pagination?.totalElements} 条</span>
                  )}
                  <Pagination
                    simple
                    size="small"
                    className='select-pagination'
                    current={current}
                    pageSize={pagination?.pageSize || 10}
                    hideOnSinglePage={true}
                    showSizeChanger={false}
                    total={pagination?.totalElements || 0}
                    onChange={pageOnChange}
                  />
                </div>
              </>
            )}
          />
        ) : (
          <Select
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
          />
        )}
      
    </div>
  );
});

export default DebounceSelect;