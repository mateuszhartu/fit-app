import React, { useState } from 'react';
import ToggleContent from 'shared/hoc/ToggleContent';
import Modal from 'shared/components/Modal/index';
import { addProduct } from 'shared/api/products';

import styles from './styles.module.scss';

const NewProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    carbs: 0,
    fat: 0,
    proteins: 0,
  });

  // [to do] redirect -> Diet component after dispatch

  return (
    <div className={styles.container}>
      <div className={`col-md-4 ${styles.name}`}>
        <label htmlFor="productName">Product name: </label>
        <input
          type="text"
          value={product.name}
          onChange={(event) => setProduct({ ...product, name: event.target.value })}
        />
      </div>
      <div className={styles.macros}>
        <label htmlFor="Carbs">Carbs: </label>
        <input
          type="number"
          value={product.carbs}
          onChange={(event) => setProduct({ ...product, carbs: parseFloat(event.target.value) })}
        />
        <span>kcal,</span>
        <label htmlFor="Fat">Fat: </label>
        <input
          type="number"
          value={product.fat}
          onChange={(event) => setProduct({ ...product, fat: parseFloat(event.target.value) })}
        />
        <span>kcal,</span>
        <label htmlFor="Proteins">Proteins: </label>
        <input
          type="number"
          value={product.proteins}
          onChange={(event) => setProduct({ ...product, proteins: parseFloat(event.target.value) })}
        />
        <span>kcal</span>
      </div>
      <ToggleContent
        toggle={(show) => (
          <button type="button" className={styles.addButton} onClick={show}>
            Add product
          </button>
        )}
        content={(hide) => (
          <Modal hide={hide}>
            <h2>{product.name}</h2>
            <p>Carbs: {product.carbs}</p>
            <p>Fat: {product.fat}</p>
            <p>Proteins: {product.proteins}</p>
            <button type="button" onClick={() => addProduct(product).then(hide)}>
              Confirm and add product
            </button>
          </Modal>
        )}
      />
    </div>
  );
};

export default NewProduct;
