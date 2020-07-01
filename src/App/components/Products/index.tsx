import React from 'react';
import { Link, Route } from 'react-router-dom';
import Product from 'App/components/Products/Product';
import Products from 'shared/interfaces/Products.inteface';
import ProductDescription from 'App/components/Products/Product/ProductDescription';
import useProductsLogic from './useProductsLogic';

import styles from './styles.module.scss';

const ProductsList = () => {
  const { products } = useProductsLogic();

  const productsList = (
    <div>
      {products.map((product: Products) => (
        <div key={product.id}>
          <Link to={`/products/${product.id}`} className={styles.Product}>
            <Product product={product} />
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className="col-md-6">{productsList}</div>
      <div className="col-md-6">
        <Route path="/products/:id" render={() => <ProductDescription />} />
      </div>
    </div>
  );
};

export default ProductsList;
