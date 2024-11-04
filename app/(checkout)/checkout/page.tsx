'use client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useCart } from "@/hooks";
import { CheckoutCart, CheckoutPriceBar, CheckoutPersonalInfo, CheckoutAddress, Container, Title } from "@/components/shared";
import { checkoutFormSchema, CheckoutFormValues } from '@/components/shared/checkout/schemas/checkout-form.schema';
import { createOrder } from '@/app/actions';




export default function CheckoutPage(){
  const { totalAmount, items, removeCartItem, loading, updateItemQuantity } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
  
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: ''
    }
  });

  const onSubmit = async(data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error('Order successfully placed', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Unable to place an order', {
        icon: '❌',
      });
    }
  }

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  return (
    <Container className="mt-10">
      <Title text="Placing an order" className="font-extrabold mb-8 text-[36px]"/>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left side */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart items={items} loading={loading} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem}/>
              <CheckoutPersonalInfo className={loading ? 'opacity-40 pointer-events-none' : ''}/>
              <CheckoutAddress className={loading ? 'opacity-40 pointer-events-none' : ''}/>
            </div>

            {/* Right side */}
            <div className="w-[450px]">
              <CheckoutPriceBar totalAmount={totalAmount} loading={loading || submitting}/>
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}