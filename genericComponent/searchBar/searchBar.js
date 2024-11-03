import { memo, useEffect, useState, useCallback } from "react";
import Image from "next/image";

import Dropdown from "../dropdown/dropdown";
import Loader from "../loader/loader";
import OutsideClickHandler from "../outsideClickHandler/outsideClickHandler";
import Input from "../input/input";
import useDebounce from "../debounce/useDebounce";

function SearchBar({
  onChange = () => {},
  debounceDelay = 500,
  searchIconSrc = "https://spyne-static.s3.amazonaws.com/console/filter/searchIcon.svg",
  iconWidth = 20,
  iconHeight = 20,
  placeholder = "Search",
  value = "",
  className = "",
  textAtTop = "",
  additionalInputProps = {},
  handleOptionClick = () => {},
  dropdownOptions = [],
  loadMoreData = () => {},
  hasMoreData = false,
  loader = <Loader />,
  endMessage = "",
  dropdownClassName = "",
  dropdownOptionClassName = "",
  showSearchOptions = false,
  searchDisabled = false,
}) {
  const [searchText, setSearchText] = useState(value);
  const debounceSearchText = useDebounce(searchText, debounceDelay);
  const [isInputActive, setIsInputActive] = useState(false);

  const onSearchTextChange = useCallback((e) => {
    if (!searchDisabled) {
      setSearchText(e.target.value);
    }
  }, []);

  useEffect(() => {
    onChange(debounceSearchText);
  }, [debounceSearchText]);

  useEffect(() => {
    setSearchText(value);
  }, [value]);
  const dropdownOptionClick = (data) => {
    setIsInputActive(false);
    handleOptionClick(data);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsInputActive(false)}>
      <div className="h-full w-full relative">
        <span onClick={() => setIsInputActive(true)}>
          <Input
            className={`!pr-[40px] ${className}`}
            value={searchText}
            onChange={onSearchTextChange}
            placeholder={placeholder}
            textAtTop={textAtTop}
            {...additionalInputProps}
          />
        </span>

        <span className="pl-2 !absolute !top-[0px] right-[3px] translate-y-[50%] z-2 bg-white overflow-hidden">
          <Image
            src={searchIconSrc}
            alt="Search icon"
            width={iconWidth}
            height={iconHeight}
          />
        </span>
        {showSearchOptions && isInputActive ? (
          <Dropdown
            handleOptionClick={dropdownOptionClick}
            dropdownOptions={dropdownOptions}
            loadMoreData={loadMoreData}
            hasMoreData={hasMoreData}
            loader={loader}
            endMessage={endMessage}
            dropdownClassName={dropdownClassName}
            dropdownOptionClassName={dropdownOptionClassName}
          />
        ) : null}
      </div>
    </OutsideClickHandler>
  );
}

export default memo(SearchBar);
