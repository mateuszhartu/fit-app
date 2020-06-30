import axios from 'axios';
import Products from 'shared/interfaces/Products.inteface';

const PATH = process.env.REACT_APP_API_URL;
const PODUCTS_ROUTE = process.env.REACT_APP_PRODUCTS_ROUTE;

// TODO dodać filtrowanie
export function getProducts(): Promise<Products[]> {
  return axios.get(`${PATH}${PODUCTS_ROUTE}.json?orderBy="name"&limitToLast=10`).then((response) => response.data);
}

export function addProduct(product: Products): Promise<Products> {
  return axios.post(`${PATH}${PODUCTS_ROUTE}.json`, product);
}

export function removeProduct(productId: string | undefined): Promise<string> {
  return axios.delete(`${PATH}${PODUCTS_ROUTE}/${productId}.json`);
}
