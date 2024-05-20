import React from 'react';
import { render } from '@testing-library/react-native';  // Adjust the path accordingly
import { SafeScreen } from '@/components/template';
import { TreeView } from '@/components/tree-view';
import Home from './Home';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn((key) => key),
  }),
}));

describe('Home Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId('scroll-view')).toBeTruthy();
    expect(getByTestId('tree-view-container')).toBeTruthy();
  });
});