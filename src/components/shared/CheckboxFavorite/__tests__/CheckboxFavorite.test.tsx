import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { CheckboxFavorite } from '../..';
import classes from '../checkbox.favorite.module.scss';

describe('CheckboxFavorite', () => {
  const mockOnFavorite = vi.fn();

  beforeEach(() => {
    mockOnFavorite.mockClear();
  });

  it('should call onFavorite when clicked', () => {
    render(<CheckboxFavorite isFavorite={false} onFavorite={mockOnFavorite} />);
    fireEvent.click(screen.getByTestId('checkbox-input'));
    expect(mockOnFavorite).toHaveBeenCalledTimes(1);
  });

  it('should display filled star when favorite', () => {
    render(<CheckboxFavorite isFavorite={true} onFavorite={mockOnFavorite} />);

    const filledStar = screen.getByTestId('star-icon-checked');
    expect(filledStar).toBeInTheDocument();
    expect(filledStar).toHaveClass(classes.favoriteChecked);
  });

  it('should display outline star when not favorite', () => {
    render(<CheckboxFavorite isFavorite={false} onFavorite={mockOnFavorite} />);

    const outlineStar = screen.getByTestId('star-icon');
    expect(outlineStar).toBeInTheDocument();
    expect(outlineStar).toHaveClass(classes.favoriteUnchecked);
  });

  it('should correctly pass checked state to base Checkbox', () => {
    const { rerender } = render(<CheckboxFavorite isFavorite={true} onFavorite={mockOnFavorite} />);

    expect(screen.getByTestId('checkbox-input')).toBeChecked();

    rerender(<CheckboxFavorite isFavorite={false} onFavorite={mockOnFavorite} />);
    expect(screen.getByTestId('checkbox-input')).not.toBeChecked();
  });

  it('should override default Checkbox onChange', () => {
    render(<CheckboxFavorite isFavorite={false} onFavorite={mockOnFavorite} />);

    const input = screen.getByTestId('checkbox-input');

    expect(input).not.toHaveAttribute('onChange');

    fireEvent.click(input);
    expect(mockOnFavorite).toHaveBeenCalled();
  });
});
