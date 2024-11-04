"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useFilters, useIngredient, useQueryFilters } from "@/hooks";
import { CheckboxFiltersGroup, RangeSlider, Title } from "./";
import { Input } from "../ui";


type Props = {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { loading, ingredients } = useIngredient();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  }
  
  return (
    <div className={cn('', className)}>
      <Title text='Filters' size='sm' className="mb-5 font-bold"/>

      <CheckboxFiltersGroup
        title='Pizza Types'
        name='pizzaTypes'
        className='mb-5'
        items={[
          { text: 'Italiano', value: '1' },
          { text: 'Americano', value: '2' }
        ]}
        selected={filters.pizzaTypes}
        onClickCheckbox={filters.setPizzaTypes}
      />

      <CheckboxFiltersGroup
        title='Sizes'
        name='sizes'
        className='mb-5'
        items={[
          { text: '20 cm', value: '20' },
          { text: '30 cm', value: '30' },
          { text: '40 cm', value: '40' }
        ]}
        selected={filters.sizes}
        onClickCheckbox={filters.setSizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="front-bold mb-3">Price from-to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type='number'
            min={0}
            max={1000}
            placeholder='0'
            value={String(filters.prices.priceFrom || '0')}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type='number'
            min={100}
            max={1000}
            placeholder='1000'
            value={String(filters.prices.priceTo || '1000')}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <div>
        <CheckboxFiltersGroup
          title='Ingredients'
          name='ingredients'
          className="mt-5"
          limit={6}
          defaultItems={items.slice(0,6)}
          items={items}
          loading={loading}
          onClickCheckbox={filters.setSelectedIngredients}
          selected={filters.selectedIngredients}
        />
      </div>
    </div>
  )
}