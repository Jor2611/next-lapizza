import { cn } from "@/lib";
import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import { WhiteBlock, CheckoutItemDetails } from "./"
import { Button, Skeleton } from "../ui";

type Props = {
  totalAmount: number;
  loading?: boolean;
  className?: string
}

const VAT = 15;
const DELIVERY_PRICE = 250;
export const CheckoutPriceBar: React.FC<Props> = ({ totalAmount, loading, className }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total</span>
        { 
          loading ? <Skeleton className="w-48 h-11"/> : <span className="h-11 text-[34px] font-extrabold">{totalPrice} D</span>
        }
        
      </div>
      
      <CheckoutItemDetails 
        title={
          <div className="flex items-center">
            <Package className="mr-2 text-gray-400" size={18}/> 
            Product's price
          </div>
        } 
        value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]"/> : `${totalAmount} D`}
      />
      <CheckoutItemDetails 
        title={
          <div className="flex items-center">
            <Percent className="mr-2 text-gray-400" size={18}/> 
            Taxes
          </div>
        } 
        value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]"/> : `${vatPrice} D`}
      />
      <CheckoutItemDetails 
          title={
          <div className="flex items-center">
            <Truck className="mr-2 text-gray-400" size={18}/> 
            Delivery
          </div>
        }
        value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]"/> : `${DELIVERY_PRICE} D`}
      />

      <Button type="submit" loading={loading} className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Place an Order
        <ArrowRight className="w-5 ml-2"/>
      </Button>
    </WhiteBlock>
  )
}