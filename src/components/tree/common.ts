import { CommonTreeItemType } from './type';

export function checkUpData(data: any[]) {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  return data;
}

export function arrayIsEmpty(data: any[]) {
  return checkUpData(data).length === 0;
}

export function isTextHasQuery(text: string, query: string) {
  const newText = text.toString().toLocaleLowerCase();
  const newQuery = query.toLocaleLowerCase();
  return newText.indexOf(newQuery) !== -1;
}

export function filterData(
  targetData: CommonTreeItemType[],
  query: string,
  data: CommonTreeItemType[]
) {
  data &&
    data.forEach((item: CommonTreeItemType) => {
      const { title = '', children = [] } = item;
      if (children && arrayIsEmpty(checkUpData(children)) && isTextHasQuery(title, query)) {
        targetData.push(item);
      } else {
        const newChildren = filterQueryData(children, query);
        if (!arrayIsEmpty(checkUpData(newChildren)) || isTextHasQuery(title, query)) {
          const newItem = {
            ...item,
            children: newChildren,
          };
          targetData.push(newItem);
        }
      }
    });
}

export function filterQueryData(data: CommonTreeItemType[], query: string) {
  if (!query) {
    return data;
  }
  const targetData: CommonTreeItemType[] = [];
  filterData(targetData, query, data);
  return targetData;
}
