// apps/client/src/features/product-filter/Filters.test.tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../../../app/store';
import { Filters } from '../../Filters';
import { initialFilterParamsState } from '../../model/filterParams.slice';

vi.mock(
  '../../entities/ingredient/model/ingredient.api',
  async (importOriginal) => {
    const actual = await importOriginal<
      typeof import('../../../../entities/ingredient/model/ingredient.api')
    >();
    return {
      ...actual,
      useGetIngredientsQuery: vi.fn().mockReturnValue({
        data: [
          { id: 1, name: 'Cheese' },
          { id: 2, name: 'Mushroom' },
        ],
        isLoading: false,
      }),
    };
  }
);

vi.mock('../../shared/hooks/useLockScroll', () => ({
  useLockScroll: vi.fn(),
}));

const mockToggleMenu = vi.fn();

const getNewCheckbox = async () => {
  const all = await screen.findAllByRole('checkbox');
  for (const cb of all) {
    const label = cb.closest('label, li')?.textContent ?? '';
    if (/Новинки/i.test(label)) return cb;
  }
  throw new Error('checkbox "Новинки" not found');
};

const getResetBtn = () => screen.findByTestId('reset-button');
const getApplyBtn = () => screen.findByText(/Применить/i);

describe('Filters component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // make sure we start every test with a clean store
    store.dispatch({ type: 'RESET' });
  });

  it('renders all filter sections', async () => {
    render(
      <Provider store={store}>
        <Filters toggleMenu={mockToggleMenu} isOpenFilters={true} />
      </Provider>
    );
    await screen.findByText(/Цена/i);
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Ингредиенты/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип теста/i)).toBeInTheDocument();
  });

  it('shows reset button when filter changes', async () => {
    render(
      <Provider store={store}>
        <Filters toggleMenu={mockToggleMenu} isOpenFilters={true} />
      </Provider>
    );
    const checkbox = await getNewCheckbox();
    fireEvent.click(checkbox);
    expect(await getResetBtn()).toBeInTheDocument();
  });

  it('resets filters and closes modal', async () => {
    render(
      <Provider store={store}>
        <Filters toggleMenu={mockToggleMenu} isOpenFilters={true} />
      </Provider>
    );
    const checkbox = await getNewCheckbox();
    fireEvent.click(checkbox);
    fireEvent.click(await getResetBtn());
    await waitFor(() => {
      expect(store.getState().filterParams).toEqual(initialFilterParamsState);
      expect(mockToggleMenu).toHaveBeenCalledOnce();
    });
  });

  it('applies filters and closes modal', async () => {
    render(
      <Provider store={store}>
        <Filters toggleMenu={mockToggleMenu} isOpenFilters={true} />
      </Provider>
    );
    const checkbox = await getNewCheckbox();
    fireEvent.click(checkbox);
    fireEvent.click(await getApplyBtn());
    await waitFor(() => {
      expect(store.getState().filterParams.isNew).toBe(true);
      expect(mockToggleMenu).toHaveBeenCalledOnce();
    });
  });

  it('closes on click outside', async () => {
    render(
      <Provider store={store}>
        <Filters toggleMenu={mockToggleMenu} isOpenFilters={true} />
      </Provider>
    );
    await screen.findByText(/Цена/i);
    fireEvent.mouseDown(document.body);
    expect(mockToggleMenu).toHaveBeenCalledOnce();
  });

  it('listens to window resize and cleans up listener on unmount', async () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(
      <Provider store={store}>
        <Filters toggleMenu={mockToggleMenu} isOpenFilters={true} />
      </Provider>
    );

    // Ensure listener was added
    expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    // Trigger resize and check nothing breaks
    fireEvent(window, new Event('resize'));

    unmount();

    // Ensure listener was removed
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('cleans up click-outside listener on unmount', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = render(
      <Provider store={store}>
        <Filters toggleMenu={mockToggleMenu} isOpenFilters={true} />
      </Provider>
    );

    expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
});