import axios from 'axios';
import DailyDiet from 'shared/interfaces/DailyDiet.interface';

const PATH = process.env.REACT_APP_API_URL;
const DIET_ROUTE = process.env.REACT_APP_DIET_ROUTE;

export default function updateDiet(diet: DailyDiet): Promise<DailyDiet> {
  return axios.put(`${PATH}${DIET_ROUTE}.json`, diet);
}
