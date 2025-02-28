import { memo } from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center">
        <div className="w-4 h-4 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
}
  
export default memo(Loader);
