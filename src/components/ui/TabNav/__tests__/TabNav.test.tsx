import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { TabNav } from '../..';
import classes from '../tab.nav.module.scss';

describe('TabNav', () => {
  const mockNavItems = [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3' },
  ];

  it('should render navigation list with correct items', () => {
    render(<TabNav navItems={mockNavItems} onChange={vi.fn()} />);

    const list = screen.getByRole('list');
    const buttons = screen.getAllByRole('button');

    expect(list).toBeInTheDocument();
    expect(buttons).toHaveLength(mockNavItems.length);
    expect(buttons[0]).toHaveTextContent('Tab 1');
    expect(buttons[1]).toHaveTextContent('Tab 2');
  });

  it('should apply root classes and custom className', () => {
    const testClass = 'custom-class';
    render(<TabNav className={testClass} navItems={mockNavItems} onChange={vi.fn()} />);

    const list = screen.getByRole('list');

    expect(list).toHaveClass(classes.root);
    expect(list).toHaveClass(testClass);
    expect(list).toHaveClass('list-reset');
  });

  it('should highlight active tab', () => {
    render(<TabNav navItems={mockNavItems} activeTab="tab2" onChange={vi.fn()} />);

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).not.toHaveClass(classes.active);
    expect(buttons[1]).toHaveClass(classes.active);
    expect(buttons[2]).not.toHaveClass(classes.active);
  });

  it('should call onChange with correct value when clicking tab', () => {
    const handleChange = vi.fn();
    render(<TabNav navItems={mockNavItems} onChange={handleChange} />);

    fireEvent.click(screen.getByText('Tab 3'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('tab3');
  });

  it('should handle different value types correctly', () => {
    const numberItems = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];
    const handleChange = vi.fn();

    render(<TabNav navItems={numberItems} activeTab={2} onChange={handleChange} />);

    fireEvent.click(screen.getByText('One'));

    expect(handleChange).toHaveBeenCalledWith(1);
    expect(screen.getByText('Two')).toHaveClass(classes.active);
  });

  it('should render all items with unique identifiers', () => {
    render(<TabNav navItems={mockNavItems} onChange={vi.fn()} />);

    const buttons = screen.getAllByRole('button');
    const uniqueTexts = new Set(buttons.map((button) => button.textContent));

    expect(uniqueTexts.size).toBe(mockNavItems.length);
  });

  it('should not mark any tab as active when activeTab is undefined', () => {
    render(<TabNav navItems={mockNavItems} onChange={vi.fn()} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).not.toHaveClass(classes.active);
    });
  });

  it('should update active tab when prop changes', () => {
    const { rerender } = render(<TabNav navItems={mockNavItems} activeTab="tab1" onChange={vi.fn()} />);

    expect(screen.getByText('Tab 1')).toHaveClass(classes.active);

    rerender(<TabNav navItems={mockNavItems} activeTab="tab3" onChange={vi.fn()} />);

    expect(screen.getByText('Tab 3')).toHaveClass(classes.active);
    expect(screen.getByText('Tab 1')).not.toHaveClass(classes.active);
  });
});
