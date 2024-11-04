'use client';
import React, { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store";
import { cn } from "@/lib/utils";
import { ProductCard, Title } from "./";
import { Product } from "@prisma/client";
import { ProductWithRelations } from "@/@types/prisma";

type Props = {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  className,
  listClassName
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 0.4 });

  useEffect(() => {
    if(intersection?.isIntersecting){
      setActiveCategoryId(categoryId);
    }
  },[categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5"/>
      <div className={cn('grid grid-cols-3 gap-[50px]',className)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  )  
}