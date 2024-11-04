"use client";
import React from "react";
import { Category } from "@prisma/client";
import { useCategoryStore } from "@/store";
import { cn } from "@/lib/utils";


type Props = {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map((category) => (
        <a
          key={category.id}
          href={`/#${category.name}`}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === category.id && 'bg-white shadow-md shadow-gray-200 text-primary'
          )}
        >
          <button>{category.name}</button>
        </a>
      ))}
    </div>
  )
}