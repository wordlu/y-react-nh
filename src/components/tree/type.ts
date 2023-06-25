export interface CommonTreeItemType {
  value?: string;
  title?: string;
  disabled?: boolean;
  children?: CommonTreeItemType[];
  isLeaf?: boolean;
  [key: string]: any;
}
