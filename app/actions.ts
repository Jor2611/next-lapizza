'use server';

import { CheckoutFormValues } from "@/components/shared/checkout/schemas/checkout-form.schema";
import { createPayment } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try{
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if(!cartToken){
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true
              }
            }
          }
        }
      },
      where: {
        token: cartToken
      }
    });

    if(!userCart){
      throw new Error('Cart not found');
    }

    if(userCart?.totalAmount === 0){
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        token: cartToken,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items)
      }
    });

    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 }
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: userCart.id }
    });

    //TODO: Stripe
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Order Payment #' + order.id
    });

    if(!paymentData){
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: paymentData.id }
    })

    return '/'
  }catch(err){
    console.log(err);
  }
}