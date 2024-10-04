import { SearchRestaurant } from "@/api/SearchApi"
import CuisnesFilter from "@/components/CuisnesFilter"
import PaginationSelector from "@/components/PaginationSelector"
import Searchbar, { SearchForm } from "@/components/Searchbar"
import SearchCart from "@/components/SearchCart"
import SearchResultInfo from "@/components/SearchResultInfo"
import SortResultInfo from "@/components/SortResultInfo"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"

export type SearchQuery = {
  searchQuery: string,
  page: number,
  selectedCuisnes: string[],
  sort: string
}

const Searchpage = () => {
  const { city } = useParams();

  const [search, setSearch] = useState<SearchQuery>({
    searchQuery: "",
    page: 1,
    selectedCuisnes: [],
    sort: "Best Match"
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const { Result, isLoading } = SearchRestaurant(search, city);

  const setSelectedcuisnes = (selectedCuisnes: string[]) => {
    setSearch((previous) => ({
      ...previous,
      selectedCuisnes,
      page: 1
    }));
  };

  const nextPage = (page: number) => {
    setSearch((previous) => ({
      ...previous,
      page
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearch((previous) => ({
      ...previous,
      searchQuery: searchFormData.searchQuery,
      page: 1
    }));
  };

  const resetQuery = () => {
    setSearch((previous) => ({
      ...previous,
      searchQuery: "",
      page: 1
    }));
  };

  // Filter the restaurants based on selected cuisines
  const filteredRestaurants = Result?.data.filter((Restaurant) => {
    if (search.selectedCuisnes.length === 0) return true; // If no cuisines are selected, show all restaurants
    return search.selectedCuisnes.every((cuisine) => Restaurant.cuisines.includes(cuisine));
  });

  if (isLoading) {
    return <Loader2 className="animate-spin mr-2 h-4 text-2xl mt-[250px]" />;
  }

  if (!city || !Result?.data) {
    return (
      <span className="mt-[250px] flex justify-center items-center">
        Result Not Found{" "}
        <Link to="/" className="cursor-pointer hover:underline text-blue-500">
          Go to Home
        </Link>
      </span>
    );
  }

  const handleSort = (sort: string) => {
    setSearch((previous) => ({
      ...previous,
      sort,
      page: 1
    }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisnes-list">
        <CuisnesFilter isExpanded={isExpanded} ExpandedClick={() => setIsExpanded((previous) => !previous)} selectedCuisnes={search.selectedCuisnes} onChange={setSelectedcuisnes} />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <Searchbar onSubmit={setSearchQuery} onReset={resetQuery} placeHolder="Search by Cuisines and Restaurant" searchQuery={search.searchQuery} />
        <div className="flex flex-col justify-between lg:flex-row">
          <SearchResultInfo total={filteredRestaurants?.length} city={city} />
          <SortResultInfo sortOption={search.sort} onChange={(value) => handleSort(value)} />
        </div>
        {/* If no restaurants match the filter, show 0 restaurants */}
        {filteredRestaurants?.length === 0 ? (
          <span>No restaurants found matching your criteria</span>
        ) : (
          filteredRestaurants?.map((item) => <SearchCart key={item._id} Item={item} />)
        )}

        <PaginationSelector page={Result.pagination.page} pages={Result.pagination.pages} onChangePage={nextPage} />
      </div>
    </div>
  );
};

export default Searchpage;

