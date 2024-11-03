import InfiniteScroll from "react-infinite-scroll-component";
import SearchResultCard from "./searchResultCard";
import Loader from "@/genericComponent/loader/loader";
import { memo } from "react";

function SearchResultsList({ searchResults, loadMoreData, hasMoreData }) {
  return (
    <InfiniteScroll
      dataLength={searchResults.length}
      next={loadMoreData}
      hasMore={hasMoreData}
      loader={<div className="flex justify-center mt-4"><Loader /></div>}
      endMessage={<div className="flex justify-center mt-4">No more search results</div>}
      style={{ minHeight: '500px', height: 'auto', maxHeight: '65vh' }}
    >
      <div className="flex flex-wrap justify-center mt-4">
        {searchResults.map((result) => (
          <SearchResultCard key={result.key} result={result} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default memo(SearchResultsList);
