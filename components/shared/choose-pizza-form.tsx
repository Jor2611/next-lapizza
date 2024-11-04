'use client';
import { ProductWithRelations } from "@/@types/prisma";
import { PizzaSize, PizzaType, pizzaTypes } from "@/constants/pizza";
import { cn,getPizzaDetails } from "@/lib";
import { GroupVariants, IngredientItem, PizzaImage, Title } from "./";
import { Button } from "../ui";
import { usePizzaOptions } from "@/hooks";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: ProductWithRelations['ingredients'];
  items: ProductWithRelations['items'];
  loading: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  ingredients,
  items,
  loading,
  onSubmit,
  className
}) => {
  const {
    type,
    size,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(
    type, 
    size, 
    items, 
    ingredients, 
    selectedIngredients
  );

  const handleClickAdd = () => {
    if(currentItemId){
      onSubmit(currentItemId, Array.from(selectedIngredients))
    }
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size}/>
      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} size='md' className='font-extrabold mb-1'/>
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants items={availableSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)}/>
          <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)}/>
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {
              ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  name={ingredient.name}
                  price={String(ingredient.price)}
                  imageUrl={ingredient.imageUrl}
                  active={selectedIngredients.has(ingredient.id)}
                  onClick={() => addIngredient(ingredient.id)}
                />
              ))
            }
          </div>
        </div>
        <Button loading={loading} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" onClick={handleClickAdd}>
          Add To Cart for {totalPrice} D
        </Button>
      </div>
    </div>
  )
}