import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const fetchSearchResults = async (searchText) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: searchText
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    throw new Error(
      error?.response?.data?.error?.message ||
        error.message ||
        "Error fetching search results."
    );
  }
};

const useGetOpenAiResult = (searchText) => {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchSearchResults(searchText);
        setSearchResults(results);
      } catch (err) {
        setError(err.message);
        invokeErrorToast(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchText) {
      fetchResults();
    }
  }, [searchText]);

  return { searchResults, loading, error };
};

export default useGetOpenAiResult;

const invokeErrorToast = (message) => {
  if (!message) return;
  toast.error(message, {
    hideProgressBar: true,
    autoClose: 2000,
    position: "bottom-center",
    pauseOnHover: true,
  });
};
