import React from 'react';
import { Route } from 'react-router-dom';

import NewProduct from 'App/components/Products/NewProduct';
import Header from './Header';
import Diet from './components/Diet';
import DietReports from './components/Reports/DietReports';
import ProductsList from './components/Products';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <div>
      <Header />
      <Route path="/products" component={() => <ProductsList isItListForSelection={false} />} />
      <Route path="/reports" component={DietReports} />
      <Route path="/user" component={Diet} />
      <Route path="/add-product" component={NewProduct} />
    </div>
  );
};

export default App;
