import React from 'react';
import { Link } from 'react-router-dom';
import Product from 'App/components/Products/Product';
import Products from 'shared/interfaces/Products.inteface';
import useProductsLogic from './useProductsLogic';

import styles from './styles.module.scss';

const ProductsList = () => {
  const { products } = useProductsLogic();
  return (
    <div>
      {products.map((product: Products) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <Product product={product} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
