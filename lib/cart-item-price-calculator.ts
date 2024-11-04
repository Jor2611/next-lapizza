import { CartItemDTO } from "@/services/dto/cart.dto";

export const cartItemPriceCalculator = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
  return (ingredientsPrice + item.productItem.price) * item.quantity;
}