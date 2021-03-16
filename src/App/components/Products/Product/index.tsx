import React, { FunctionComponent } from 'react';
import { removeProduct } from 'shared/api/products';
import Products from 'shared/interfaces/Products.inteface';

import styles from './styles.module.scss';

interface Props {
  product: Products;
  canRemoveProduct: boolean;
  isItListForSelection: boolean;
}

const Product: FunctionComponent<Props> = (product) => {
  const sumCalculator = ({ carbs, proteins, fat }: Products) => (carbs + proteins + fat) * 4;

  return (
    <div className={styles.ProductCard}>
      <div className={!product.isItListForSelection ? styles.Macros : styles.lightMacros}>
        <h4>{product.product.name}</h4>
        <p>{sumCalculator(product.product)} kcal</p>
        <p>C: {product.product.carbs} g</p>
        <p>F: {product.product.fat} g</p>
        <p>P: {product.product.proteins} g</p>
      </div>
      {!product.isItListForSelection && (
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pellentesque consectetur nibh, vel eleifend arcu
          aliquam quis. Proin tempus, ipsum ut dignissim lobortis, magna lectus porta eros, maximus cursus nisi metus id
          justo. Mauris pretium odio in ultricies egestas. Proin sit amet lectus ex. Quisque in purus sed justo pretium
          dignissim. Nullam posuere diam ligula, elementum molestie diam efficitur ut. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Quisque et dolor felis.
        </p>
      )}
      {product.canRemoveProduct && (
        <button className={`btn ${styles.RemoveBtn}`} type="button" onClick={() => removeProduct(product.product.id)}>
          <strong>X</strong>
        </button>
      )}
    </div>
  );
};

export default Product;
