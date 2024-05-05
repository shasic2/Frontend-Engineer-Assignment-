import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBox from '../components/SearchBox';

describe('SearchBox', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('ignores excessive spaces in user input', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBox onSearch={mockOnSearch} />);

    // Simulate user typing only spaces
    fireEvent.change(screen.getByPlaceholderText('Search by title...'), {
      target: { value: '   ' }
    });

    // Wait for the debounce time to expire
    await new Promise(r => setTimeout(r, 1100));

    // Expect `onSearch` to be called with an empty string
    expect(mockOnSearch).toHaveBeenCalledWith('');

    // Now enter a valid string with leading and trailing spaces
    fireEvent.change(screen.getByPlaceholderText('Search by title...'), {
      target: { value: '   hello world   ' }
    });

    // Wait for the debounce time to expire
    await new Promise(r => setTimeout(r, 1100));

    // Expect `onSearch` to be called with trimmed and space-squashed input
    expect(mockOnSearch).toHaveBeenCalledWith('hello world');
  });

  it('does not call onSearch when input is less than three characters', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBox onSearch={mockOnSearch} />);

    // Simulate user typing a single character
    const inputs = screen.getAllByPlaceholderText('Search by title...');
    // Assuming you want the first input
    fireEvent.change(inputs[0], {
      target: { value: 'a' }
    });

    // Wait for the debounce time to expire (assuming there is a debounce)
    await new Promise(r => setTimeout(r, 1100));

    // Expect `onSearch` not to be called after short input
    expect(mockOnSearch).not.toHaveBeenCalled();

    // Now test with two characters, make sure to use the same input method as before
    fireEvent.change(inputs[0], {
      target: { value: 'ab' }
    });

    // Wait again for the debounce time to expire
    await new Promise(r => setTimeout(r, 1100));

    // Expect `onSearch` still not to be called
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
