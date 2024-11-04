import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Title } from "./";
import { Button } from "../ui";
import { Ingredient } from "@prisma/client";

type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ 
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className 
 }) => {
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]" >
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name}/>
        </div>
        <Title text={name} size='sm' className='mb-1 mt-3 font-bold'/>
        <p className='text-sm text-gray-400'>
         { ingredients.map((ingredient) => ingredient.name).join(', ') }
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            from <b>{price} D</b>
          </span>

          <Button variant='secondary'>
            <Plus size={20} className="mr-1"/>
            Add To Cart
          </Button>
        </div>
      </Link>
    </div>
  )
}