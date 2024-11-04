import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { pizzaPriceCalculator } from "./pizza-price-calcuclator";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const textDetails = `${size} cm,${mapPizzaType[type]} pizza.`
  const totalPrice = pizzaPriceCalculator(type, size, items, ingredients, selectedIngredients);

  return { textDetails, totalPrice };
}
