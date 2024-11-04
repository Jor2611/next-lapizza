import { axiosInsance } from "./http";
import { CartDTO, CreateCartItemDTO } from "./dto/cart.dto";

export const fetchCart = async(): Promise<CartDTO> => {
  return (await axiosInsance.get<CartDTO>('/cart')).data;
}

export const updateItemQuantity = async(itemId: number, quantity: number):Promise<CartDTO> => {
  return (await axiosInsance.patch<CartDTO>('/cart/' + itemId, { quantity })).data;
} 

export const removeCartItem = async(id: number): Promise<CartDTO> => {
  return (await axiosInsance.delete<CartDTO>('/cart/' + id)).data;
}

export const addCartItem = async(values: CreateCartItemDTO): Promise<CartDTO> => {
  return (await axiosInsance.post<CartDTO>('/cart', values)).data;
}