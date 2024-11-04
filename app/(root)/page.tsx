import { Suspense } from "react";
import { Container, ProductGroupList, Title, TopBar, Filters } from "@/components/shared";
import { findPizzas, GetSearchParams } from "@/components/shared/find-pizzas";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);

  return (
    <div>
      <Container className="mt-10">
        <Title text="LaPizza" size="lg" className="font-extrabold"/>
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Filters */}
          <div className="w-[250px]">
            <Suspense>
              <Filters/>
            </Suspense>
          </div>

          {/* Products List */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              { categories.map((category) => (
                category.products.length > 0 && (
                  <ProductGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                )
              )) }
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
