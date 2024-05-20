import React from 'react';
import { render } from '@testing-library/react-native';
import { SelectedVariantsProps } from '@/types/types';
import SelectedVariants from './selected-variants';

describe('SelectedVariants Component', () => {
  test('renders correctly', () => {
    const selectedItems: { [key: string]: any } = {
      testModel: { name: 'Test Variant', type: 'variant', model: 'testModel' }, // Adjust as per TreeNodeData interface
    };
    const props: SelectedVariantsProps = {
      selectedItems,
      testID: 'test-selected-variants',
    };
    const { getByTestId } = render(<SelectedVariants {...props} />);
    const selectedVariantsContainer = getByTestId('test-selected-variants');
    expect(selectedVariantsContainer).toBeTruthy();
  });
});
