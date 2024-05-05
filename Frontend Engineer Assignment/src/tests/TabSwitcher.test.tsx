import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabSwitcher from '../components/TabSwitcher';  // Adjust the path as necessary

describe('TabSwitcher', () => {
  // Clean up the DOM after each test
  afterEach(() => {
    cleanup();
  });

  it('calls onChangeTab with "movie" when the Movies button is clicked', async () => {
    const handleChangeTab = vi.fn();
    render(<TabSwitcher onChangeTab={handleChangeTab} />);

    const movieButton = screen.getByRole('button', { name: 'Movies' });
    await userEvent.click(movieButton);

    expect(handleChangeTab).toHaveBeenCalledWith('movie');
  });

  it('calls onChangeTab with "tv" when the TV Shows button is clicked', async () => {
    const handleChangeTab = vi.fn();
    render(<TabSwitcher onChangeTab={handleChangeTab} />);

    const tvButton = screen.getByRole('button', { name: 'TV Shows' });
    await userEvent.click(tvButton);

    expect(handleChangeTab).toHaveBeenCalledWith('tv');
  });
});
