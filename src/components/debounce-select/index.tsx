import { Select, Spin } from 'antd';
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

const DebounceSelect = forwardRef(({ fetchOptions, debounceTimeout = 800, ...props }, ref) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [val, setVal] = useState<string>('');
  const fetchRef = useRef(0);

  useImperativeHandle(ref, () => ({
    handleSearch,
    defaultOptions,
  }));

  useEffect(() => {
    debounceFetcher('');
  }, []);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setVal(value);
        // console.log(11188822, newOptions, value);

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const handleSearch = () => {
    debounceFetcher(val);
  };

  const defaultOptions = (options?: any) => {
    setOptions(options || []);
  };

  return (
    <Select
      // labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
});

export default DebounceSelect;
