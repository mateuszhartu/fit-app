import React, { FunctionComponent } from 'react';
import { removeProduct } from 'shared/api/products';
import Products from 'shared/interfaces/Products.inteface';

import styles from './styles.module.scss';

interface Props {
  product: Products;
}

const Product: FunctionComponent<Props> = (product) => {
  const sumCalculator = ({ carbs, proteins, fat }: Products) => (carbs + proteins + fat) * 4;

  return (
    <div className={styles.ProductCard}>
      <h3>{product.product.name}</h3>
      <div className={styles.Macros}>
        <p>Carbs: {product.product.carbs} kcal</p>
        <p>Fat: {product.product.fat} kcal</p>
        <p>Proteins: {product.product.proteins} kcal</p>
      </div>
      <p>Sum: {sumCalculator(product.product)} kcal</p>
      <button type="button" onClick={() => removeProduct(product.product.id)}>
        X
      </button>
    </div>
  );
};

export default Product;
