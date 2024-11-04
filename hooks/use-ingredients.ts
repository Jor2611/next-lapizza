import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client"
import { Api } from "@/services/apiClient";

export const useIngredient = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIngredients(){
      try{
        const fetchedIngredients = await Api.ingredients.getAll();
        setIngredients(fetchedIngredients);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { loading, ingredients }
}