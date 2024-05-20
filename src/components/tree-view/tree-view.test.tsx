import React from 'react';
import { render } from '@testing-library/react-native';
import { TreeViewProps } from '@/types/types';
import { TreeView } from './tree-view';

describe('TreeView Component', () => {
  test('renders correctly', () => {
    const props: TreeViewProps = {
      testID: 'test-tree-view',
    };
    const { getByTestId } = render(<TreeView {...props} />);
    const treeViewContainer = getByTestId('test-tree-view-container');
    expect(treeViewContainer).toBeTruthy();
  });

  test('renders browser products header', () => {
    const props: TreeViewProps = {
      testID: 'test-tree-view',
    };
    const { getByTestId } = render(<TreeView {...props} />);
    const browserProductsHeader = getByTestId('browser-products-header');
    expect(browserProductsHeader).toBeTruthy();
  });
  
  test('renders list container', () => {
    const props: TreeViewProps = {
      testID: 'test-tree-view',
    };
    const { getByTestId } = render(<TreeView {...props} />);
    const listContainer = getByTestId('list-container');
    expect(listContainer).toBeTruthy();
  });
  
  test('renders selected variants container', () => {
    const props: TreeViewProps = {
      testID: 'test-tree-view',
    };
    const { getByTestId } = render(<TreeView {...props} />);
    const selectedVariantsContainer = getByTestId('selected-variants-container');
    expect(selectedVariantsContainer).toBeTruthy();
  });
  
  test('renders selected variants header', () => {
    const props: TreeViewProps = {
      testID: 'test-tree-view',
    };
    const { getByTestId } = render(<TreeView {...props} />);
    const selectedVariantsHeader = getByTestId('selected-variants-header');
    expect(selectedVariantsHeader).toBeTruthy();
  });
  
});
