import { memo } from "react";

function SearchResultCard({ result }) {
  return (
    <div className="p-4 max-w-sm bg-white shadow-md rounded-lg m-2">
        <img
          src={result.thumbnail || ""}
          alt="Search result thumbnail"
          className="w-full h-auto mb-2 rounded-t-lg"
        />
        <a
          href={result.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          <h3 className="text-lg font-semibold mb-2">{result.text}</h3>
        </a>
        <p className="text-sm text-gray-600 mb-4">{result.snippet}</p>
        <div className="flex items-center mt-2">
          <img
            src={result.favicon}
            alt="Favicon"
            className="w-8 h-8 mr-2 rounded-full"
          />
          <span className="text-sm text-gray-600">
            {result.displayLink}
          </span>
        </div>
      </div>
    );
  }
  
  export default memo(SearchResultCard);
  