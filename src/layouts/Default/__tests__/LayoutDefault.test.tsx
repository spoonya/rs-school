import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { LayoutDefault } from '../';

describe('LayoutDefault', () => {
  it('should render', () => {
    render(<LayoutDefault />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render children', () => {
    const children = <div>Test</div>;

    render(<LayoutDefault>{children}</LayoutDefault>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
