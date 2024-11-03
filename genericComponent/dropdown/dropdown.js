import { memo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader/loader";

function Dropdown({
  handleOptionClick = () => {},
  dropdownOptions = [],
  loadMoreData = () => {},
  hasMoreData = false,
  loader = <Loader />,
  endMessage = <div>No more results</div>,
  dropdownClassName = "",
  dropdownOptionClassName = "",
}) {
  return (
    <div
      className={`absolute w-full border-[1px] rounded-[5px]  bg-white rounded-t-none border-grey z-10 overflow-auto ${dropdownClassName}`}
      id="generic_dropdown"
    >
      <InfiniteScroll
        dataLength={dropdownOptions?.length}
        next={loadMoreData}
        hasMore={hasMoreData}
        loader={loader && <div className="text-center py-2">{loader}</div>}
        endMessage={
          endMessage && (
            <div className="text-center py-2">
              <b>{endMessage}</b>
            </div>
          )
        }
        scrollableTarget="generic_dropdown"
        style={{ overflow: "visible" }}
      >
        <ul>
          {dropdownOptions.map((option, index) => (
            <li
              key={option.key || index}
              className={`p-2 cursor-pointer hover:bg-gray-100 w-full ${dropdownOptionClassName} ${
                option.class || ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default memo(Dropdown);
