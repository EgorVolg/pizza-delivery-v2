import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setParams } from '../../widgets/Filters/model/filterParams.slice';
import { MAX_PRICE, MIN_PRICE } from '../../widgets/Filters/model/filter.const';

export const useFilterUrlSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filterParams = useSelector((state: RootState) => state.filterParams);

  // Function to serialize filter params to URL
  const serializeFilters = (params: typeof filterParams) => {
    const newParams = new URLSearchParams();

    if (params.type.length > 0) {
      newParams.set('type', params.type.join(','));
    }

    if (params.isNew) {
      newParams.set('isNew', 'true');
    }

    if (params.price[0] !== MIN_PRICE || params.price[1] !== MAX_PRICE) {
      newParams.set('price', `${params.price[0]}-${params.price[1]}`);
    }

    if (params.ingredients.length > 0) {
      newParams.set('ingredients', params.ingredients.join(','));
    }

    return newParams;
  };

  // Function to deserialize URL to filter params
  const deserializeFilters = (params: URLSearchParams) => {
    const type = params.get('type')?.split(',').map(Number).filter(n => !isNaN(n)) || [];
    const isNew = params.get('isNew') === 'true';
    const priceStr = params.get('price');
    let price: [number, number] = [MIN_PRICE, MAX_PRICE];
    if (priceStr) {
      const [min, max] = priceStr.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        price = [Math.max(MIN_PRICE, min), Math.min(MAX_PRICE, max)];
      }
    }
    const ingredients = params.get('ingredients')?.split(',').map(Number).filter(n => !isNaN(n)) || [];

    return { type, isNew, price, ingredients };
  };

  // Sync URL to state on mount and URL change
  useEffect(() => {
    const urlFilters = deserializeFilters(searchParams);
    dispatch(setParams(urlFilters));
  }, [searchParams, dispatch]);

  // Sync state to URL on state change
  useEffect(() => {
    const newParams = serializeFilters(filterParams);
    const currentParams = new URLSearchParams(searchParams);

    // Check if params have changed to avoid infinite loop
    if (newParams.toString() !== currentParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }
  }, [filterParams, searchParams, setSearchParams]);
};
