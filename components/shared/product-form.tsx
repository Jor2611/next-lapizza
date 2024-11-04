'use client';
import React from "react";
import toast from "react-hot-toast";
import { useCartStore } from "@/store";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ 
  product,  
  onSubmit: _onSubmit,
  className 
}) => {
  const { addCartItem, loading } = useCartStore((state) => state);
  
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async(productItemId: number, ingredients?: number[]) => {
    try{
      const itemData = isPizzaForm 
        ? { productItemId, ingredients } 
        : { productItemId };
      await addCartItem(itemData);
      toast.success('Item was added to cart!');
      _onSubmit?.();
    }catch(err){
      toast.error('Unable to add the product')
      console.log(err);
    }
  }

  if(isPizzaForm){
    return (
      <ChoosePizzaForm 
        imageUrl={product.imageUrl} 
        name={product.name} 
        ingredients={product.ingredients} 
        items={product.items} 
        onSubmit={onSubmit} 
        loading={loading}
      />
    )
  }

  return (
    <ChooseProductForm 
      imageUrl={product.imageUrl} 
      name={product.name} 
      price={firstItem.price} 
      onSubmit={() => onSubmit(firstItem.id)} 
      loading={loading}
    />
  );
}