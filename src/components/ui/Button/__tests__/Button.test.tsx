import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../..';
import classes from '../button.module.scss';

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should have correct class when className prop is provided', () => {
    render(<Button className="test-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });

  it('should combine root class with custom className', () => {
    render(<Button className="custom-class">Click</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass('custom-class');
  });

  it('should apply primary variant class', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass(classes.primary);
  });

  it('should apply secondary variant class', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass(classes.secondary);
  });

  it('should not have variant classes when variant is not provided', () => {
    render(<Button>No variant</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass(classes.primary);
    expect(button).not.toHaveClass(classes.secondary);
  });

  it('should not apply variant classes for invalid variant', () => {
    render(<Button variant={'invalid' as 'primary' | 'secondary'}>Click</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass(classes.primary);
    expect(button).not.toHaveClass(classes.secondary);
  });

  it('should render children correctly', () => {
    render(
      <Button>
        <span>Test</span>
      </Button>
    );
    expect(screen.getByRole('button').querySelector('span')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should not trigger onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should have correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should pass additional HTML attributes', () => {
    render(
      <Button id="test-button" aria-label="Test" data-testid="button-test" title="Test button">
        Click
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', 'test-button');
    expect(button).toHaveAttribute('aria-label', 'Test');
    expect(button).toHaveAttribute('data-testid', 'button-test');
    expect(button).toHaveAttribute('title', 'Test button');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
