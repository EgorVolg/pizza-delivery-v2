import { useMemo } from 'react';
import { useSelector } from 'react-redux'; 
import { filterPizzas, sortPizzas } from './filterSort';
import { useGetPizzasQuery } from '../../../entities/pizza/model/pizza.api';
import type { RootState } from '../../../app/store';

export function useFilteredPizzas() {
  const { data = [], isLoading } = useGetPizzasQuery();
  const filter = useSelector((s: RootState) => s.filterParams);
  const sort   = useSelector((s: RootState) => s.sortParams);

  return useMemo(() => {
    const filtered = filterPizzas(data, filter);
    return { data: sortPizzas(filtered, sort), isLoading };
  }, [data, filter, sort, isLoading]);
}