import { Poppins } from 'next/font/google';
import { describe, expect, it, vi } from 'vitest';

import { metadata } from '../app/layout';

vi.mock('next/font/google', () => ({
  Poppins: vi.fn().mockImplementation(() => ({
    className: 'mock-poppins-class',
  })),
}));

describe('RootLayout Component', () => {
  it('should set correct metadata', () => {
    expect(metadata.title).toBe('Nexum');
    expect(metadata.description).toMatch(/Server Side Rendering/);
  });

  it('should initialize Poppins font with correct config', () => {
    expect(Poppins).toHaveBeenCalledWith({
      weight: ['300', '400', '500', '700'],
      subsets: ['latin'],
      display: 'swap',
    });
  });
});
