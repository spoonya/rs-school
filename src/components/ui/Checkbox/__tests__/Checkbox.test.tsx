import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { Checkbox } from '../..';
import classes from '../checkbox.module.scss';

describe('Checkbox', () => {
  it('should render', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should have correct class when className prop is provided', () => {
    render(<Checkbox className="test-class" />);
    expect(screen.getByTestId('checkbox-wrapper')).toHaveClass('test-class');
  });

  it('should have correct icon class when icon prop is provided', () => {
    render(<Checkbox icon={<div>Icon</div>} />);
    expect(screen.getByTestId('checkbox-icon')).toHaveClass(classes.customIcon);
  });

  it('should have correct icon when icon prop is provided', () => {
    render(<Checkbox icon={<div>Icon</div>} />);
    expect(screen.getByTestId('checkbox-icon')).toHaveTextContent('Icon');
  });

  it('should have correct label when label prop is provided', () => {
    render(<Checkbox label="Test Label" />);
    expect(screen.getByTestId('checkbox-text')).toHaveTextContent('Test Label');
  });

  it('should call onChange when checkbox is clicked', () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} />);
    fireEvent.click(screen.getByTestId('checkbox-input'));
    expect(onChange).toHaveBeenCalled();
  });

  it('should have correct checked state when checked prop is provided', () => {
    render(<Checkbox checked />);
    expect(screen.getByTestId('checkbox-input')).toBeChecked();
  });

  it('should display checkedIcon when checked and checkedIcon provided', () => {
    render(<Checkbox checkedIcon={<div>Checked</div>} checked />);
    expect(screen.getByTestId('checkbox-icon')).toHaveTextContent('Checked');
  });

  it('should display default Check icon when checked and no icons provided', () => {
    render(<Checkbox checked />);
    const checkIcon = screen.getByTestId('default-check-icon');
    expect(checkIcon).toHaveClass('lucide-check');
  });

  it('should display icon when unchecked and icon provided', () => {
    render(<Checkbox icon={<div>Unchecked</div>} checked={false} />);
    expect(screen.getByTestId('checkbox-icon')).toHaveTextContent('Unchecked');
  });

  it('should handle disabled state', () => {
    render(<Checkbox disabled />);
    expect(screen.getByTestId('checkbox-input')).toBeDisabled();
    expect(screen.getByTestId('checkbox-wrapper')).toHaveClass(classes.disabled);
  });

  it('should pass name and value to input', () => {
    render(<Checkbox name="test-name" value="test-value" />);
    const input = screen.getByTestId('checkbox-input');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toHaveAttribute('value', 'test-value');
  });

  it('should toggle state when label is clicked', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Test Label" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('checkbox-text'));
    expect(onChange).toHaveBeenCalled();
  });

  it('should prioritize checkedIcon over icon when checked', () => {
    render(<Checkbox icon={<div>Icon</div>} checkedIcon={<div>Checked Icon</div>} checked />);
    expect(screen.getByTestId('checkbox-icon')).toHaveTextContent('Checked Icon');
  });

  it('should not display icon when unchecked and no icon provided', () => {
    render(<Checkbox checked={false} />);
    expect(screen.getByTestId('checkbox-icon')).toBeEmptyDOMElement();
  });

  it('should combine custom class with internal classes', () => {
    render(<Checkbox className="custom-class" />);
    const wrapper = screen.getByTestId('checkbox-wrapper');
    expect(wrapper).toHaveClass(classes.root);
    expect(wrapper).toHaveClass('custom-class');
  });
});
