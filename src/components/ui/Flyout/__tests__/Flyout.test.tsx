import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { Flyout } from '../..';
import classes from '../flyout.module.scss';

describe('Flyout', () => {
  const mockContent = <div data-testid="content">Main Content</div>;
  const mockMinimizedContent = <div data-testid="minimized-content">Minimized</div>;

  it('should render with basic props', () => {
    render(<Flyout isOpen>{mockContent}</Flyout>);

    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('flyout')).toHaveClass(classes['is-open']);
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(<Flyout isOpen={false}>{mockContent}</Flyout>);

    expect(container.firstChild).toHaveClass(classes['is-closed']);
  });

  it('should apply position classes', () => {
    const { rerender } = render(
      <Flyout isOpen position="bottom-left">
        {mockContent}
      </Flyout>
    );

    expect(screen.getByTestId('flyout')).toHaveClass(classes['bottom-left']);

    rerender(
      <Flyout isOpen position="bottom-right">
        {mockContent}
      </Flyout>
    );

    expect(screen.getByTestId('flyout')).toHaveClass(classes['bottom-right']);
  });

  it('should toggle minimized state', async () => {
    render(
      <Flyout isOpen minimizeBtn contentOnMinimize={mockMinimizedContent}>
        {mockContent}
      </Flyout>
    );

    const button = screen.getByRole('button');

    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.queryByTestId('minimized-content')).toBeNull();

    fireEvent.click(button);
    expect(screen.queryByTestId('content')).toBeNull();
    expect(screen.getByTestId('minimized-content')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('should handle hover effects on minimized state', () => {
    render(
      <Flyout isOpen minimizeBtn contentOnMinimize={mockMinimizedContent}>
        {mockContent}
      </Flyout>
    );

    const button = screen.getByTestId('flyout-minimize-btn');

    fireEvent.click(button);

    fireEvent.mouseEnter(button);
    expect(screen.getByTestId('maximize-icon')).toBeInTheDocument();

    fireEvent.mouseLeave(button);
    expect(screen.queryByTestId('maximize-icon')).toBeNull();
  });

  it('should handle accessibility correctly', () => {
    render(
      <Flyout isOpen minimizeBtn>
        {mockContent}
      </Flyout>
    );

    const button = screen.getByTestId('flyout-minimize-btn');
    expect(button).toHaveAttribute('aria-label', 'Minimize');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Maximize');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Minimize');
  });

  it('should call onMinimize callback', () => {
    const handleMinimize = vi.fn();
    render(
      <Flyout isOpen minimizeBtn onMinimize={handleMinimize}>
        {mockContent}
      </Flyout>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleMinimize).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    const testClass = 'custom-flyout';
    render(
      <Flyout isOpen className={testClass}>
        {mockContent}
      </Flyout>
    );

    expect(screen.getByTestId('flyout')).toHaveClass(testClass);
  });

  it('should show/hide minimize button', () => {
    const { rerender } = render(
      <Flyout isOpen minimizeBtn={false}>
        {mockContent}
      </Flyout>
    );

    expect(screen.queryByTestId('flyout-minimize-btn')).toBeNull();

    rerender(
      <Flyout isOpen minimizeBtn>
        {mockContent}
      </Flyout>
    );

    expect(screen.getByTestId('flyout-minimize-btn')).toBeInTheDocument();
  });
});
