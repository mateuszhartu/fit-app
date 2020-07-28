import { getProducts } from 'shared/api/products';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';
import { setProducts } from 'shared/store/features/productsSlice';
import Products from 'shared/interfaces/Products.inteface';
import useDebounce from 'shared/hooks/useDebounce';
import React, { useCallback, useEffect, useState } from 'react';

const useProductsLogic = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);
  const [filterText, setFilterText] = useState('');
  const debounceFilterText = useDebounce(filterText, 500);
  // TODO dodać filtr w deps i obsługę błędu (np. globalny alert)

  const filterProducts = useCallback(() => {
    getProducts(debounceFilterText).then((filteredProducts: Products[]) => {
      const fetchedProducts = [];
      for (const key in filteredProducts) {
        fetchedProducts.push({
          ...filteredProducts[key],
          id: key,
        });
      }
      dispatch(setProducts({ products: fetchedProducts }));
    });
  }, [debounceFilterText, dispatch]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts, debounceFilterText]);

  const onFilterTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  return {
    onFilterTextChange,
    products,
  };
};
export default useProductsLogic;
