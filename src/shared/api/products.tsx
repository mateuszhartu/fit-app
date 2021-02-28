import axios from 'axios';
import Products from 'shared/interfaces/Products.inteface';

const PATH = process.env.REACT_APP_API_URL;
const PRODUCTS_ROUTE = process.env.REACT_APP_PRODUCTS_ROUTE;

// Console logs will be replaced here by the alert component

export function getProducts(searchText: string): Promise<Products[]> {
  return axios
    .get(`${PATH}${PRODUCTS_ROUTE}.json?orderBy="name"&startAt="${searchText}"&limitToLast=10`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export function addProduct(product: Products): Promise<void | Products> {
  return axios
    .post(`${PATH}${PRODUCTS_ROUTE}.json`, product)
    .then(() => {
      console.log('product successfully added');
    })
    .catch((error) => console.log(error));
}

export function removeProduct(productId: string | undefined): Promise<void> {
  return axios
    .delete(`${PATH}${PRODUCTS_ROUTE}/${productId}.json`)
    .then(() => {
      console.log('product successfully deleted');
    })
    .catch((error) => console.log(error));
}
