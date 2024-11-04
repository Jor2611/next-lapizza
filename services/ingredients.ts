import { Ingredient } from "@prisma/client"
import { axiosInsance } from "./http"
import { ApiRoutes } from "./constants"

export const getAll = async(): Promise<Ingredient[]> => {
  return (await axiosInsance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
}