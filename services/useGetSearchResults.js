import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Fetches search results from Google Custom Search API
const fetchSearchResults = async (query, startIndex) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${query}&start=${startIndex}`
    );

    if (response.status === 429) {
      throw new Error("Quota exceeded. Please try again later.");
    }

    if (response.status !== 200) {
      throw new Error("An error occurred while fetching results.");
    }
    const data = await response.json();
    
    return {
      items: data.items?.map((item, index) => ({
        key: startIndex + index,
        text: item.title,
        link: item.formattedUrl,
        displayLink: item.displayLink,
        snippet: item.snippet,
        thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src || null,
        favicon: `https://www.google.com/s2/favicons?domain=${item.link}&sz=256`,
      })) || [],
      nextPage: data.queries?.nextPage?.[0]?.startIndex || null,
    };

  } catch (error) {
    throw error;
  }
};

// Custom hook to get search results
const useGetSearchResults = (searchText, pageNo) => {
  const [searchResults, setSearchResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!searchText) return;

    const fetchResults = async () => {
      setIsFetching(true);
      try {
        const startIndex = pageNo * 10 + 1;
        const { items, nextPage } = await fetchSearchResults(searchText, startIndex);

        setSearchResults((prevResults) =>
          pageNo === 0 ? items : [...prevResults, ...items]
        );
        setNextPage(nextPage);

      } catch (error) {
        setNextPage(null);
        invokeErrorToast(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchResults();
  }, [searchText, pageNo]);

  return { searchResults, nextPage, isFetching };
};

// Error toast notification
const invokeErrorToast = (error) => {
  const message = error?.message || "An unknown error occurred. Please try again later.";
  toast.error(message, {
    hideProgressBar: true,
    autoClose: 2000,
    position: "bottom-center",
    pauseOnHover: true,
  });
};

export default useGetSearchResults;
