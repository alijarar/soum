import React from 'react';
import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import { TreeNodeProps, TreeNodeData } from '@/types/types';
import { TreeNode } from './tree-node';

describe('TreeNode component', () => {
  const item: TreeNodeData = {
    name: 'Apple',
    type: 'brand',
    children: [
      { name: 'iPhone 6', type: 'model', children: [{ name: '128 GB', type: 'variant' }] }
    ]
  };

  const renderTreeNode = (props?: Partial<TreeNodeProps>): RenderAPI => {
    const defaultProps: TreeNodeProps = {
      item,
      level: 0,
      styles: {},
      onSelect: jest.fn(),
      selectedItems: {},
    };
    return render(<TreeNode {...defaultProps} {...props} />);
  };

  test('renders correctly with provided item', () => {
    const { getByText } = renderTreeNode();
    expect(getByText('Apple')).toBeTruthy();
  });

  test('expands and collapses nodes', () => {
    const { getByTestId } = renderTreeNode();
    const nodeText = getByTestId('node-text-Apple');
    expect(nodeText).toBeTruthy();

    fireEvent.press(nodeText);
    expect(getByTestId('tree-node-iPhone 6')).toBeTruthy();

    fireEvent.press(nodeText);
    expect(() => getByTestId('tree-node-iPhone 6')).toThrow();
  });

  test('renders child nodes accurately', () => {
    const { getByText } = renderTreeNode();
    const nodeText = getByText('Apple');
    fireEvent.press(nodeText);
    expect(getByText('iPhone 6')).toBeTruthy();
  });

  test('does not render child nodes if item has no children', () => {
    const itemWithoutChildren: TreeNodeData = {
      name: 'Samsung',
      type: 'brand',
      children: []
    };
    const { queryByText } = renderTreeNode({ item: itemWithoutChildren });
    const nodeText = queryByText('Samsung');
    expect(nodeText).toBeTruthy();
    fireEvent.press(nodeText!);
    expect(queryByText('iPhone 6')).toBeNull();
  });

});
