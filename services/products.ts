import { ApiRoutes } from "./constants"
import { axiosInsance } from "./http"

export const search = async(query: string) => {
  return (await axiosInsance.get(ApiRoutes.SEARCH_PRODUCTS, { params: { query } })).data;
}