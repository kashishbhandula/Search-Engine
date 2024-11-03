import ReactMarkdown from "react-markdown";
import { useState } from "react";

function Summary({ openAiResult }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Summary</h2>
      <div
        className={`transition-all overflow-hidden ${isExpanded ? "max-h-full" : "max-h-[50px]"}`}
      >
        <ReactMarkdown>{openAiResult}</ReactMarkdown>
      </div>
      <button
        className="mt-2 text-blue-500 hover:text-blue-700 font-medium"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}

export default Summary;
