import React, { useEffect, useState } from 'react';
import ToggleContent from 'shared/hoc/ToggleContent';
import Modal from 'shared/components/Modal/index';
import globalStyles from 'shared/styles/globalStyles.module.scss';
import { addProduct } from 'shared/api/products';

import styles from './styles.module.scss';

const NewProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    carbs: 0,
    fat: 0,
    proteins: 0,
  });
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    const valid = product.name !== '';
    setValidForm(valid);
  }, [product]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Add your product</h3>
      <div className={styles.name}>
        <label htmlFor="productName">Product name: </label>
        <input
          type="text"
          value={product.name}
          onChange={(event) => setProduct({ ...product, name: event.target.value })}
        />
      </div>
      <div className={styles.macros}>
        <div className={styles.macrosElement}>
          <label htmlFor="Carbs">Carbs: </label>
          <input
            type="number"
            value={product.carbs || 0}
            min={0}
            max={100 - product.fat - product.proteins}
            onChange={(event) => setProduct({ ...product, carbs: parseFloat(event.target.value) })}
          />
          <span>g</span>
        </div>
        <div className={styles.macrosElement}>
          <label htmlFor="Fat">Fat: </label>
          <input
            type="number"
            value={product.fat || 0}
            min={0}
            max={100 - product.carbs - product.proteins}
            onChange={(event) => setProduct({ ...product, fat: parseFloat(event.target.value) })}
          />
          <span>g</span>
        </div>
        <div className={styles.macrosElement}>
          <label htmlFor="Proteins">Proteins: </label>
          <input
            type="number"
            value={product.proteins || 0}
            min={0}
            max={100 - product.carbs - product.fat}
            onChange={(event) => setProduct({ ...product, proteins: parseFloat(event.target.value) })}
          />
          <span>g</span>
        </div>
      </div>
      <ToggleContent
        toggle={(show) => (
          <button type="button" className={globalStyles.buttonDefault} disabled={!validForm} onClick={show}>
            Add product
          </button>
        )}
        content={(hide) => (
          <Modal hide={hide}>
            <h2 className={styles.modalTitle}>{product.name}</h2>
            <p className={styles.modalText}>Carbs: {product.carbs} g</p>
            <p className={styles.modalText}>Fat: {product.fat} g</p>
            <p className={styles.modalText}>Proteins: {product.proteins} g</p>
            <button type="button" className={globalStyles.buttonDefault} onClick={() => addProduct(product).then(hide)}>
              Confirm and add product
            </button>
          </Modal>
        )}
      />
    </div>
  );
};

export default NewProduct;
