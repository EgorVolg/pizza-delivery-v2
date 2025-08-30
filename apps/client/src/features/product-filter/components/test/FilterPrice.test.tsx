// src/__tests__/FilterPrice.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'; 
import { MAX_PRICE, MIN_PRICE } from '../../model/filter.const';
import { FilterPrice } from '../FilterPrice';

describe('FilterPrice', () => {
  const defaultProps = {
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE,
    onChange: vi.fn(),
  };

  it('renders inputs with correct placeholders and empty value when prices equal limits', () => {
    render(<FilterPrice {...defaultProps} />);

    const minInput = screen.getByTestId('min-price') as HTMLInputElement;
    const maxInput = screen.getByTestId('max-price') as HTMLInputElement;

    expect(minInput.placeholder).toBe(MIN_PRICE.toString());
    expect(maxInput.placeholder).toBe(MAX_PRICE.toString());

    expect(minInput.value).toBe('');
    expect(maxInput.value).toBe('');
  });

  it('renders non-empty value in inputs when prices differ from limits', () => {
    render(
      <FilterPrice
        {...defaultProps}
        minPrice={100}
        maxPrice={500}
      />,
    );

    expect(screen.getByTestId('min-price')).toHaveValue(100);
    expect(screen.getByTestId('max-price')).toHaveValue(500);
  });

  it('calls onChange with correct index and value when inputs change', () => {
    render(<FilterPrice {...defaultProps} />);

    const minInput = screen.getByTestId('min-price');
    const maxInput = screen.getByTestId('max-price');

    fireEvent.change(minInput, { target: { value: '50' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(0, 50);

    fireEvent.change(maxInput, { target: { value: '400' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(1, 400);
  });

  it('shows error message when minPrice >= maxPrice', () => {
    render(
      <FilterPrice
        {...defaultProps}
        minPrice={300}
        maxPrice={300}
      />,
    );

    expect(
      screen.getByText('Укажите корректный диапазон'),
    ).toBeInTheDocument();
  });

  it('shows error message when minPrice < MIN_PRICE', () => {
    render(
      <FilterPrice
        {...defaultProps}
        minPrice={MIN_PRICE - 1}
      />,
    );

    expect(
      screen.getByText('Укажите корректный диапазон'),
    ).toBeInTheDocument();
  });

  it('shows error message when maxPrice > MAX_PRICE', () => {
    render(
      <FilterPrice
        {...defaultProps}
        maxPrice={MAX_PRICE + 1}
      />,
    );

    expect(
      screen.getByText('Укажите корректный диапазон'),
    ).toBeInTheDocument();
  });

  it('does not show error message when range is correct', () => {
    render(
      <FilterPrice
        {...defaultProps}
        minPrice={100}
        maxPrice={200}
      />,
    );

    expect(
      screen.queryByText('Укажите корректный диапазон'),
    ).not.toBeInTheDocument();
  });
});