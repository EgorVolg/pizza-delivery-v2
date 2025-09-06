// src/__tests__/FilterPrice.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'; 
import { FilterPrice } from '../FilterPrice';
import { MAX_PRICE, MIN_PRICE } from '../../../../widgets/Filters/model/filter.const';

describe('FilterPrice', () => {
  const onChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('render', () => {
    it('renders inputs with correct placeholders and empty value when prices equal limits', () => {
      render(
        <FilterPrice
          minPrice={MIN_PRICE}
          maxPrice={MAX_PRICE}
          onChange={onChange}
        />,
      );

      expect(screen.getByTestId('min-price')).toHaveValue(null); // empty
      expect(screen.getByTestId('max-price')).toHaveValue(null); // empty
      expect(screen.getByPlaceholderText(MIN_PRICE.toString())).toBeInTheDocument();
      expect(screen.getByPlaceholderText(MAX_PRICE.toString())).toBeInTheDocument();
    });

    it('renders non-empty value in inputs when prices differ from limits', () => {
      render(
        <FilterPrice
          minPrice={100}
          maxPrice={500}
          onChange={onChange}
        />,
      );

      expect(screen.getByTestId('min-price')).toHaveValue(100);
      expect(screen.getByTestId('max-price')).toHaveValue(500);
    });
  });

  describe('onChange', () => {
    it('calls onChange with correct index and value when inputs change', () => {
      render(
        <FilterPrice
          minPrice={MIN_PRICE}
          maxPrice={MAX_PRICE}
          onChange={onChange}
        />,
      );

      fireEvent.change(screen.getByTestId('min-price'), { target: { value: '50' } });
      expect(onChange).toHaveBeenCalledWith(0, 50);

      fireEvent.change(screen.getByTestId('max-price'), { target: { value: '400' } });
      expect(onChange).toHaveBeenCalledWith(1, 400);
    });
  });

  describe('error message (lines 46-60)', () => {
    it.each([
      { min: MIN_PRICE - 1, max: 100, case: 'min < MIN_PRICE' },
      { min: 200, max: MAX_PRICE + 1, case: 'max > MAX_PRICE' },
      { min: 300, max: 300, case: 'min === max' },
      { min: 400, max: 200, case: 'min > max' },
    ])('shows error when $case', ({ min, max }) => {
      render(
        <FilterPrice
          minPrice={min}
          maxPrice={max}
          onChange={onChange}
        />,
      );

      expect(
        screen.getByText('Укажите корректный диапазон'),
      ).toBeInTheDocument();
    });

    it('does NOT show error when range is valid', () => {
      render(
        <FilterPrice
          minPrice={100}
          maxPrice={200}
          onChange={onChange}
        />,
      );

      expect(
        screen.queryByText('Укажите корректный диапазон'),
      ).not.toBeInTheDocument();
    });
  });

  describe('empty inputs when equal limits (lines 71-76 & 109-117)', () => {
    it('renders empty min input when minPrice equals MIN_PRICE', () => {
      render(
        <FilterPrice
          minPrice={MIN_PRICE}
          maxPrice={500}
          onChange={onChange}
        />,
      );
      expect((screen.getByTestId('min-price') as HTMLInputElement).value).toBe('');
    });

    it('renders empty max input when maxPrice equals MAX_PRICE', () => {
      render(
        <FilterPrice
          minPrice={100}
          maxPrice={MAX_PRICE}
          onChange={onChange}
        />,
      );
      expect((screen.getByTestId('max-price') as HTMLInputElement).value).toBe('');
    });
  });
});