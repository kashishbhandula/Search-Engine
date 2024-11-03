import SearchResultCard from "./searchResultCard";
import { memo, useCallback, useRef } from "react";

function SearchResultsList({ searchResults, loadMoreData, hasMoreData }) {

  const observerRef = useRef(null);

  const lastItemRef = useCallback(node => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        loadMoreData()
      }
    }, {
      rootMargin: '60px', 
      threshold: 0.1
    });

    if (node) observerRef.current.observe(node);
  }, [hasMoreData]);


  return (
   
      <div className="flex flex-wrap justify-center mt-4">
        {searchResults.map((result, index) => (
          <div  ref={index === searchResults.length - 1 ? lastItemRef : null}>
            <SearchResultCard key={result.key} result={result} />
          </div>
        ))}
      </div>
 
  );
}

export default memo(SearchResultsList);


