import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContentDisplay from '../components/ContentDisplay';
import api from '../api';

// Ensure correct mocking based on how `api` is exported in your actual code
vi.mock('../api', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({
      data: {
        results: new Array(10).fill(null).map((_, i) => ({
          id: i,
          title: `Movie ${i + 1}`,
          poster_path: `/movie${i + 1}.jpg`
        }))
      }
    }))
  }
}));

describe('ContentDisplay', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays top 10 movies when type is "movie" and no filter is applied', async () => {
    render(
      <MemoryRouter>
        <ContentDisplay type="movie" filter="" />
      </MemoryRouter>
    );

    const movieItems = await screen.findAllByText(/Movie \d/, { exact: false });
    expect(movieItems).toHaveLength(10);
  });
});
