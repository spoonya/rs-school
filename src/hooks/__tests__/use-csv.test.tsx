import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { coinCSVOptions } from '@/utils';
import { fireEvent, render, screen } from '@testing-library/react';

import { useCSV } from '../';

vi.mock('@/utils', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/utils')>();
  return {
    ...original,
    generateCSV: vi.fn().mockReturnValue('mocked,csv,content'),
  };
});

const mockCreateObjectURL = vi.fn(() => 'blob:fake-url');
const mockRevokeObjectURL = vi.fn();

class MockBlob {
  constructor(
    public data: string[],
    public options: { type: string }
  ) {}
}

describe('useCSV', () => {
  beforeEach(() => {
    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;
    global.Blob = MockBlob as unknown as typeof global.Blob;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render CSVLink component correctly', () => {
    const TestComponent = () => {
      const { CSVLink } = useCSV();
      return <CSVLink />;
    };

    render(<TestComponent />);
    const link = screen.getByTestId('csv-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveStyle('display: none');
    expect(link).toHaveAttribute('aria-hidden', 'true');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should handle default filename', async () => {
    const TestComponent = () => {
      const { downloadCSV, CSVLink } = useCSV();
      return (
        <div>
          <CSVLink />
          <button onClick={() => downloadCSV([], { fields: [] })}>Download</button>
        </div>
      );
    };

    render(<TestComponent />);
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));

    const link = screen.getByTestId('csv-link');
    expect(link).toHaveAttribute('download', 'data.csv');
  });

  it('should generate CSV with coin data', async () => {
    const TestComponent = () => {
      const { downloadCSV, CSVLink } = useCSV();
      return (
        <div>
          <CSVLink />
          <button
            onClick={() =>
              downloadCSV(
                [
                  {
                    name: 'Bitcoin',
                    symbol: 'BTC',
                    rank: 1,
                    price: 50000,
                    id: '1',
                    icon: 'btc.png',
                    priceBtc: 1,
                    volume: 1000000,
                    marketCap: 1000000000,
                    fullyDilutedValuation: 1000000000,
                    availableSupply: 1000000000,
                    totalSupply: 1000000000,
                    redditUrl: 'https://reddit.com',
                    twitterUrl: 'https://twitter.com',
                    explorers: ['https://explorer.com'],
                  },
                ],
                coinCSVOptions,
                'coins.csv'
              )
            }
          >
            Download Coins
          </button>
        </div>
      );
    };

    render(<TestComponent />);
    fireEvent.click(screen.getByRole('button', { name: 'Download Coins' }));

    const link = screen.getByTestId('csv-link');
    expect(link).toHaveAttribute('download', 'coins.csv');
  });
});
