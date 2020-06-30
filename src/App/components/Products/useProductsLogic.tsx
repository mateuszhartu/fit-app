import { getProducts } from 'shared/api/products';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'shared/store/rootReducer';
import { setProducts } from 'shared/store/features/productsSlice';
import Products from 'shared/interfaces/Products.inteface';
import { useCallback, useEffect } from 'react';

const useProductsLogic = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);
  // TODO dodać filtr w deps i obsługę błędu (np. globalny alert)

  const filterProducts = useCallback(() => {
    getProducts().then((filteredProducts: Products[]) => {
      const fetchedProducts = [];
      for (const key in filteredProducts) {
        fetchedProducts.push({
          ...filteredProducts[key],
          id: key,
        });
      }
      dispatch(setProducts({ products: fetchedProducts }));
    });
  }, [dispatch]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  return {
    products,
  };
};
export default useProductsLogic;
