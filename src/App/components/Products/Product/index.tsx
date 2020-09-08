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
      <h6>{product.product.name}</h6>
      <div className={styles.Macros}>
        <p>C: {product.product.carbs} kcal</p>
        <p>F: {product.product.fat} kcal</p>
        <p>P: {product.product.proteins} kcal</p>
      </div>
      <p>Sum: {sumCalculator(product.product)} kcal</p>
      <button className={`btn ${styles.RemoveBtn}`} type="button" onClick={() => removeProduct(product.product.id)}>
        X
      </button>
    </div>
  );
};

export default Product;
