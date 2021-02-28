import axios from 'axios';
import DailyDiet from 'shared/interfaces/DailyDiet.interface';
import FetchedFirebaseData from 'shared/interfaces/FetchedDailyDiet.interface';

const PATH = process.env.REACT_APP_API_URL;
const DIET_ROUTE = process.env.REACT_APP_DIET_ROUTE;

// Console logs will be replaced here by the alert component

export function addDiet(diet: DailyDiet): Promise<void | DailyDiet> {
  return axios
    .post(`${PATH}${DIET_ROUTE}.json`, diet)
    .then(() => {
      console.log('diet successfully added');
    })
    .catch((error) => console.log(error));
}

export function updateDiet(diet: DailyDiet, dietId: string): Promise<void | DailyDiet> {
  return axios
    .put(`${PATH}${DIET_ROUTE}/${dietId}.json`, diet)
    .then(() => {
      console.log('diet successfully updated');
    })
    .catch((error) => console.log(error));
}

export function getDiet(startDate: string, endDate: string): Promise<FetchedFirebaseData> {
  return axios
    .get(`${PATH}${DIET_ROUTE}.json?orderBy="date"&startAt="${startDate}"&endAt="${endDate}"&print=pretty`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
