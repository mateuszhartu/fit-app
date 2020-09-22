import axios from 'axios';
import Products from 'shared/interfaces/Products.inteface';

const PATH = process.env.REACT_APP_API_URL;
const PRODUCTS_ROUTE = process.env.REACT_APP_PRODUCTS_ROUTE;

export function getProducts(searchText: string): Promise<Products[]> {
  return axios
    .get(`${PATH}${PRODUCTS_ROUTE}.json?orderBy="name"&startAt="${searchText}"&limitToLast=10`)
    .then((response) => response.data);
}

export function addProduct(product: Products): Promise<Products> {
  return axios.post(`${PATH}${PRODUCTS_ROUTE}.json`, product);
}

export function removeProduct(productId: string | undefined): Promise<string> {
  return axios.delete(`${PATH}${PRODUCTS_ROUTE}/${productId}.json`);
}
