import Ingredient from './Ingredient.interface';

export default interface Meal {
  ingredients: Ingredient[];
  kcal: number;
}
