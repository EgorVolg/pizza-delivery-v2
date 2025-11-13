import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/api/baseUrl";
import type { PizzaResponse, ProductFilters } from "./pizza.types";

// Вспомогательная функция для сериализации фильтров
const buildQueryString = (filters?: ProductFilters) => {
  if (!filters) return "";
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "")
      params.append(key, String(value));
  });
  return `?${params.toString()}`;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    // ---------- Общий универсальный запрос ----------
    getAllProducts: builder.query<PizzaResponse[], ProductFilters | void>({
      async queryFn(filters, _api, _extra, baseQuery) {
        const query = buildQueryString(filters);

        // Все эндпоинты, которые надо объединить
        const endpoints = ["/products", "/appetizers", "/romanPizzas", "/coffees"];

        try {
          // параллельная загрузка
          const results = await Promise.all(
            endpoints.map((endpoint) => baseQuery(`${endpoint}${query}`))
          );

          // отбрасываем ошибки
          const validData = results
            .filter((r): r is { data: PizzaResponse[] } => !!r.data)
            .flatMap((r) => r.data);

          return { data: validData };
        } catch (e) {
          return { error: e as any };
        }
      },
      providesTags: ["Products"],
    }),

    // ---------- Обычные запросы по категориям ----------
    getProducts: builder.query<PizzaResponse[], ProductFilters | void>({
      query: (filters) => `/products${buildQueryString(filters)}`,
      providesTags: ["Products"],
    }),

    getRomanPizzas: builder.query<PizzaResponse[], ProductFilters | void>({
      query: (filters) => `/romanPizzas${buildQueryString(filters)}`,
      providesTags: ["Products"],
    }),

    getAppetizers: builder.query<PizzaResponse[], ProductFilters | void>({
      query: (filters) => `/appetizers${buildQueryString(filters)}`,
      providesTags: ["Products"],
    }),

    getCoffees: builder.query<PizzaResponse[], ProductFilters | void>({
      query: (filters) => `/coffees${buildQueryString(filters)}`,
      providesTags: ["Products"],
    }),

    // ---------- Запросы по ID ----------
    getProductById: builder.query<
      PizzaResponse,
      { categoryId: number; id: number }
    >({
      query: ({ categoryId, id }) => `/products/${categoryId}/${id}`,
      providesTags: ["Products"],
    }),
  }),
});

export const {
  // общий
  useGetAllProductsQuery,

  // по категориям
  useGetProductsQuery,
  useGetAppetizersQuery,
  useGetRomanPizzasQuery,
  useGetCoffeesQuery,

  // по id
  useGetProductByIdQuery,
} = productsApi;
