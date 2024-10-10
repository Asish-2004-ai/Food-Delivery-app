import { SearchQuery } from "@/pages/Searchpage"
import { Restaurant, searchRestaurant } from "@/type"
import { useQuery } from "react-query"


const BASE_URL = "https://food-delivery-app-oigi.onrender.com"

export const getRestaurant = (restaurantId?: string) => {
  const restaurant = async (): Promise<Restaurant> => {
    const response = await fetch(`${BASE_URL}/api/restaurants/${restaurantId}`)

    if (!response.ok) {
      throw new Error("Not Found")
    }
    return response.json()
  }
  const { data: Result, isLoading } = useQuery("getRestaurant", restaurant, {enabled: !!restaurantId})

  return { Result, isLoading }
}

export const SearchRestaurant = (search: SearchQuery, city?: string) => {
  const params = new URLSearchParams()
  params.set("searchQuery", search.searchQuery)
  params.set("page", search.page.toString())
  params.set("selectedCuisnes", search.selectedCuisnes.join(","))
  params.set("sortOption", search.sort)
  const Restaurant = async (): Promise<searchRestaurant> => {
    const response = await fetch(`${BASE_URL}/api/restaurants/search/${city}?${params.toString()}`)

    if (!response.ok) {
      throw new Error("Not Found")
    }
    return response.json()
  }

  const { data: Result, isLoading } = useQuery(["searchRestaurant", search], Restaurant, { enabled: !!city })
  return { Result, isLoading }
}