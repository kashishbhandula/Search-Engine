import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import useGetOpenAiResult from "../../services/useGetOpenAiResult";
import Summary from "./summary";
import SearchResultsList from "./searchResultList";
import SearchBarWrapper from "./searchBarWrapper";
import useGetSearchResults from "@/services/useGetSearchResults";

function Search() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const { searchResults: openAiResult } = useGetOpenAiResult(searchText);
  const [pageNo, setPageNo] = useState(0);
  const { searchResults, nextPage: hasMoreData } = useGetSearchResults(searchText, pageNo);

  const handleSearch = useCallback((text) => {
    setSearchText(text);
    setPageNo(0);
  }, []);

  const handleOptionClick = useCallback((option) => {
    setSearchText(option.text);
    router.push(`/search?q=${option.text}`);
  }, [router]);

  const loadMoreData = useCallback(() => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  }, []);

  useEffect(() => {
    if (router.query.q) {
      setSearchText(router.query.q);
    }
  }, [router.query.q]);

  return (
    <>
      <div className="relative z-[2] h-[25vh]">
        <div className="p-4 w-full fixed flex flex-col justify-center bg-white shadow-md">
          <div className="flex w-full">
            <SearchBarWrapper
              options={searchResults}
              value={searchText}
              handleSearch={handleSearch}
              handleOptionClick={handleOptionClick}
              loadMoreData={loadMoreData}
              hasMoreData={hasMoreData}
            />
          </div>
          {openAiResult && <Summary openAiResult={openAiResult} />}
        </div>
      </div>

      <div className="p-4 relative bg-gray-100">
        <SearchResultsList
          searchResults={searchResults}
          loadMoreData={loadMoreData}
          hasMoreData={hasMoreData}
        />
      </div>
    </>
  );
}

export default Search;
