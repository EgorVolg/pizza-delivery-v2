import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setParams } from '../../widgets/Filters/model/filterParams.slice';
import { setActiveId } from '../../entities/topbar/categories/model/activeCategories.slice';
import { MAX_PRICE, MIN_PRICE } from '../../widgets/Filters/model/filter.const';

const FILTERS_STORAGE_KEY = 'pizza-filters';
const CATEGORY_STORAGE_KEY = 'pizza-active-category';

export const useFilterUrlSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filterParams = useSelector((state: RootState) => state.filterParams);
  const activeCategoryId = useSelector((state: RootState) => state.setActiveId.activeId);

  // Function to serialize filter params and category to URL
  const serializeFilters = (params: typeof filterParams, categoryId: number) => {
    const newParams = new URLSearchParams();

    if (categoryId !== 1) { // Assuming 1 is the default category
      newParams.set('category', categoryId.toString());
    }

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

  // Function to check if URL has any filter params
  const hasFilterParams = (params: URLSearchParams) => {
    return params.has('type') || params.has('isNew') || params.has('price') || params.has('ingredients') || params.has('category');
  };

  // Sync URL to state on mount and URL change
  useEffect(() => {
    let urlFilters = deserializeFilters(searchParams);
    let categoryId = 1; // default

    const categoryStr = searchParams.get('category');
    if (categoryStr) {
      categoryId = Number(categoryStr);
      if (!isNaN(categoryId) && categoryId > 0) {
        // category from URL
      } else {
        categoryId = 1;
      }
    }

    // If URL has no filter params, try to load from localStorage
    if (!hasFilterParams(searchParams)) {
      const savedFilters = localStorage.getItem(FILTERS_STORAGE_KEY);
      if (savedFilters) {
        try {
          urlFilters = JSON.parse(savedFilters);
        } catch (e) {
          console.warn('Failed to parse saved filters from localStorage');
        }
      }

      const savedCategory = localStorage.getItem(CATEGORY_STORAGE_KEY);
      if (savedCategory) {
        const parsedCategory = Number(savedCategory);
        if (!isNaN(parsedCategory) && parsedCategory > 0) {
          categoryId = parsedCategory;
        }
      }
    }

    dispatch(setParams(urlFilters));
    if (categoryId !== 1) {
      dispatch(setActiveId(categoryId));
    }
  }, [searchParams, dispatch]);

  // Save filters to localStorage on state change
  useEffect(() => {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filterParams));
  }, [filterParams]);

  // Save active category to localStorage on state change
  useEffect(() => {
    localStorage.setItem(CATEGORY_STORAGE_KEY, activeCategoryId.toString());
  }, [activeCategoryId]);

  // Sync state to URL on state change
  useEffect(() => {
    const newParams = serializeFilters(filterParams, activeCategoryId);
    const currentParams = new URLSearchParams(searchParams);

    // Check if params have changed to avoid infinite loop
    if (newParams.toString() !== currentParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }
  }, [filterParams, activeCategoryId, searchParams, setSearchParams]);
};
