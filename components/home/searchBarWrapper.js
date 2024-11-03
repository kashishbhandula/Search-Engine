import SearchBar from "@/genericComponent/searchBar/searchBar";
import useGetSearchResults from "@/services/useGetSearchResults";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";

function SearchBarWrapper() {
  const router = useRouter();
  const [searchText, setSearchText] = useState();
  const [pageNo, setPageNo] = useState(0);

  const { searchResults, nextPage: hasMoreData } = useGetSearchResults(
    searchText,
    pageNo
  );

  const handleSearch = useCallback((text) => {
    setSearchText(text);
    setPageNo(0);
  }, []);

  const handleOptionClick = useCallback(
    (option) => {
      setSearchText(option.text);
      router.push(`/search?q=${option.text}`);
    },
    [router]
  );

  const loadMoreData = useCallback(() => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  }, []);

  return (
    <SearchBar
      dropdownOptions={searchResults || []}
      placeholder="Search..."
      handleOptionClick={handleOptionClick}
      value={searchText}
      onChange={handleSearch}
      hasMoreData={hasMoreData}
      loadMoreData={loadMoreData}
      className="relative rounded-lg border border-gray-200 bg-white h-12 sm:w-[90%] md:w-[800px] w-full max-w-lg"
      dropdownClassName="rounded-b-lg max-h-52 overflow-auto"
      showSearchOptions={true}
      endMessage="No More Search results"
    />
  );
}

export default SearchBarWrapper;
