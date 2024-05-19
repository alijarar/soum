export interface Variant {
	name: string;
  }
  
  export interface Model {
	name: string;
	variants: Variant[];
  }
  
  export interface Brand {
	name: string;
	models: Model[];
  }
  
  export interface Category {
	name: string;
	brands: Brand[];
  }


interface TreeNodeProps {
    item: TreeNodeData;
    level: number;
    styles: any;
    onSelect: (item: TreeNodeData) => void;
    selectedItems: any;
  }
  
  interface TreeViewProps {
    customStyles?: TreeViewStyles;
  }
  
  interface TreeNodeData {
    name: string;
    children?: TreeNodeData[];
    type: 'category' | 'brand' | 'model' | 'variant';
    value?: any
  }
  
  interface TreeViewStyles {
    nodeText: object;
    customNodeText?: object;
    nodeContainer?: object;
  }