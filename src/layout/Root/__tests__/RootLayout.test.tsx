import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { RootLayout } from '../';

describe('RootLayout', () => {
  it('should render', () => {
    render(<RootLayout />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render children', () => {
    const children = <div>Test</div>;

    render(<RootLayout>{children}</RootLayout>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
