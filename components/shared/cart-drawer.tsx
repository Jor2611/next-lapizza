'use client';
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import EmptyBoxImg from '@/assets/images/empty-box.png'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui';
import { ArrowBigLeft, ArrowRight } from "lucide-react";
import { cn, getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { useCart } from "@/hooks";
import { CartDrawerItem, Title } from "./";
import { Button } from "../ui";


export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { 
    totalAmount, 
    items, 
    updateItemQuantity, 
    removeCartItem
  } = useCart();
  const [redirecting, setRedirecting] = useState(false);
  

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }
  
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 && ( 
            <SheetHeader>
              <SheetTitle>
                  In Cart <span className="font-bold">{items.length} items</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src={EmptyBoxImg} alt='Empty cart' width={120} height={120}/>
              <Title size="sm" text="The cart is empty" className="text-center font-bold my-2"/>
              <p className="text-center text-neutral-500 mb-5">
                Add at least one product to cart, for making an order!
              </p>

              <SheetClose>
                <Button className="w-56 h-12 text-base" size='lg'>
                  <ArrowBigLeft className="w-5 mr-2"/>
                  Go back
                </Button>
              </SheetClose>
            </div>
          )}

          {/* Items */}
        {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={item.pizzaSize && item.pizzaType 
                        ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                        : ''
                      }
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>
            
              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Sum
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>
                    <span className="font-bold text-lg">{totalAmount} D</span>
                  </div>

                  <Link href='/checkout'>
                    <Button
                      onClick={()=> setRedirecting(true)}
                      loading={redirecting}
                      type="submit"
                      className="w-full h-12 text-base">
                      Place an order
                      <ArrowRight className="w-5 ml-2"/>
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
        
      </SheetContent>
    </Sheet>
  )
}