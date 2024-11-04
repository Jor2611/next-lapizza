import { prisma } from "@/prisma/prisma-client"
import { cartItemPriceCalculator } from "./cart-item-price-calculator";

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          productItem: {
            include: {
              product: true
            }
          },
          ingredients: true
        }
      }
    }
  });

  if(!userCart) return 0;

  const totalAmount = userCart.items.reduce((sum, item) => sum + cartItemPriceCalculator(item), 0);

  return await prisma.cart.update({
    where: { id: userCart.id },
    data: { totalAmount },
    include: {
      items: {
        orderBy: { createdAt: 'desc' },
        include: {
          productItem: {
            include: {
              product: true
            }
          },
          ingredients: true
        }
      }
    }
  });
}