import InfiniteScroll from "react-infinite-scroll-component";
import SearchResultCard from "./searchResultCard";

function SearchResultsList({ searchResults, loadMoreData, hasMoreData }) {
  return (
    <InfiniteScroll
      dataLength={searchResults.length}
      next={loadMoreData}
      hasMore={hasMoreData}
      loader={<div>Loading...</div>}
      endMessage={<div>No more search results</div>}
    >
      <div className="flex flex-wrap justify-center mt-4">
        {searchResults.map((result) => (
          <SearchResultCard key={result.key} result={result} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default SearchResultsList;
