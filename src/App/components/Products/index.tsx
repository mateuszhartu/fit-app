import React, { FunctionComponent } from 'react';
import Product from 'App/components/Products/Product';
import Products from 'shared/interfaces/Products.inteface';
import ProductDescription from 'App/components/Products/Product/ProductDescription';
import Drawer from 'shared/hoc/Drawer';
import useProductsLogic from './useProductsLogic';

import styles from './styles.module.scss';

interface Props {
  isItListForSelection: boolean;
}

const ProductsList: FunctionComponent<Props> = (props) => {
  const { products, isSidebarOpened, setIsSidebarOpened, onFilterTextChange, onProductSelection } = useProductsLogic();

  const productsList = (
    <div>
      {products.map((product: Products) => (
        <div
          key={product.id}
          onClick={() => onProductSelection(product, props.isItListForSelection)}
          role="button"
          aria-hidden="true"
          aria-label="select Product"
        >
          <Product
            product={product}
            isItListForSelection={props.isItListForSelection}
            canRemoveProduct={!props.isItListForSelection}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={`row justify-content-md-center ${styles.mainContent}`}>
        <div className="col-md-8">
          <input className={styles.filter} placeholder="Search" onChange={onFilterTextChange} />
          {productsList}
        </div>
        {isSidebarOpened && (
          <Drawer close={() => setIsSidebarOpened(false)}>
            <ProductDescription />
          </Drawer>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
