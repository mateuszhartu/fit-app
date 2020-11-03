import axios from 'axios';
import DailyDiet from 'shared/interfaces/DailyDiet.interface';

const PATH = process.env.REACT_APP_API_URL;
const DIET_ROUTE = process.env.REACT_APP_DIET_ROUTE;

export function addDiet(diet: DailyDiet): Promise<DailyDiet> {
  return axios.post(`${PATH}${DIET_ROUTE}.json`, diet);
}

export function updateDiet(diet: DailyDiet, dietId: string): Promise<DailyDiet> {
  return axios.put(`${PATH}${DIET_ROUTE}/${dietId}.json`, diet);
}

export function getDiet(startDate: string, endDate: string): Promise<DailyDiet> {
  return axios
    .get(`${PATH}${DIET_ROUTE}.json?orderBy="date"&startAt="${startDate}"&endAt="${endDate}"&print=pretty`)
    .then((response) => response.data);
}
