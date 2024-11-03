import SearchBar from "@/genericComponent/searchBar/searchBar";
import { memo } from "react";

function SearchBarWrapper({
  value,
  handleSearch,
  handleOptionClick,
  loadMoreData,
  hasMoreData,
  options,
}) {
  return (
    <SearchBar
      dropdownOptions={options}
      placeholder="Search..."
      handleOptionClick={handleOptionClick}
      value={value}
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

export default memo(SearchBarWrapper);
