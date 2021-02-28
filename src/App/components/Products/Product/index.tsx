import React, { FunctionComponent } from 'react';
import { removeProduct } from 'shared/api/products';
import Products from 'shared/interfaces/Products.inteface';

import styles from './styles.module.scss';

interface Props {
  product: Products;
  canRemoveProduct: boolean;
}

const Product: FunctionComponent<Props> = (product) => {
  const sumCalculator = ({ carbs, proteins, fat }: Products) => (carbs + proteins + fat) * 4;

  return (
    <div className={styles.ProductCard}>
      <h6>{product.product.name}</h6>
      <div className={styles.Macros}>
        <p>C: {product.product.carbs} g</p>
        <p>F: {product.product.fat} g</p>
        <p>P: {product.product.proteins} g</p>
      </div>
      <p>{sumCalculator(product.product)} kcal</p>
      {product.canRemoveProduct && (
        <button className={`btn ${styles.RemoveBtn}`} type="button" onClick={() => removeProduct(product.product.id)}>
          <strong>X</strong>
        </button>
      )}
    </div>
  );
};

export default Product;
