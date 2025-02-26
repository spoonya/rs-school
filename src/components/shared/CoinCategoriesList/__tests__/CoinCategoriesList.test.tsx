import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import { CoinCategories, coinCategories } from '@/services';
import { setActiveCategory } from '@/store/coin-categories/slice';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';

import { CoinCategoriesList } from '../';

type MockStoreState = {
  coinCategories: {
    activeCategory: CoinCategories;
  };
};

type TabNavProps = {
  navItems: Array<{ label: string; value: CoinCategories }>;
  activeTab: CoinCategories;
  onChange: (value: CoinCategories) => void;
};

vi.mock('@/components/ui', () => ({
  TabNav: vi.fn(({ navItems, activeTab, onChange }: TabNavProps) => (
    <div data-testid="tab-nav">
      {navItems.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          data-active={activeTab === item.value ? 'true' : 'false'}
          aria-label={`Category ${item.label}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )),
}));

describe('CoinCategoriesList', () => {
  const createMockStore = (state: MockStoreState) =>
    configureStore({
      reducer: {
        coinCategories: () => state.coinCategories,
      },
    });

  it('should render with default props', () => {
    const mockStore = createMockStore({
      coinCategories: {
        activeCategory: CoinCategories.ALL,
      },
    });

    render(
      <Provider store={mockStore}>
        <CoinCategoriesList />
      </Provider>
    );

    const tabNav = screen.getByTestId('tab-nav');
    const buttons = screen.getAllByRole('button');

    expect(tabNav).toBeInTheDocument();
    expect(buttons.length).toBe(coinCategories.length);
  });

  it('should pass correct props to TabNav', () => {
    const mockStore = createMockStore({
      coinCategories: {
        activeCategory: CoinCategories.ALL,
      },
    });

    render(
      <Provider store={mockStore}>
        <CoinCategoriesList />
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    const firstButton = buttons[0];
    const expectedCategory = coinCategories[0];

    expect(firstButton).toHaveAttribute('data-active', 'true');
    expect(firstButton).toHaveTextContent(expectedCategory.label);
  });

  it('should dispatch setActiveCategory when changing category', () => {
    const mockStore = createMockStore({
      coinCategories: {
        activeCategory: CoinCategories.ALL,
      },
    });

    const mockDispatch = vi.fn();
    mockStore.dispatch = mockDispatch;

    render(
      <Provider store={mockStore}>
        <CoinCategoriesList />
      </Provider>
    );

    const targetButton = screen.getByText(coinCategories[1].label);
    fireEvent.click(targetButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setActiveCategory(coinCategories[1].value));
  });

  it('should apply custom className', () => {
    const testClass = 'custom-class';
    const mockStore = createMockStore({
      coinCategories: {
        activeCategory: CoinCategories.ALL,
      },
    });

    const { container } = render(
      <Provider store={mockStore}>
        <CoinCategoriesList className={testClass} />
      </Provider>
    );

    const wrapperDiv = container.querySelector(`.${testClass}`);
    expect(wrapperDiv).toBeInTheDocument();
    expect(wrapperDiv).toHaveClass(testClass);
  });

  it('should show active category correctly', () => {
    const targetCategory = CoinCategories.FAVORITES;
    const mockStore = createMockStore({
      coinCategories: {
        activeCategory: targetCategory,
      },
    });

    render(
      <Provider store={mockStore}>
        <CoinCategoriesList />
      </Provider>
    );

    const buttons = screen.getAllByRole('button');

    const activeButton = buttons.find((button) => button.getAttribute('data-active') === 'true');

    expect(activeButton).toBeDefined();

    if (activeButton) {
      const expectedLabel = coinCategories.find((c) => c.value === targetCategory)?.label;

      expect(activeButton).toHaveTextContent(expectedLabel ?? '');
    }
  });

  it('should handle undefined active category', () => {
    const mockStore = configureStore({
      reducer: {
        coinCategories: () => ({
          activeCategory: undefined as unknown as CoinCategories,
        }),
      },
    });

    render(
      <Provider store={mockStore}>
        <CoinCategoriesList />
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('data-active', 'false');
    });
  });
});
